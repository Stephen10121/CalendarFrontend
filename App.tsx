import { setClickGroup, setJobSelect, setSelected, setToken, setUserData } from './redux/actions';
import { StyleSheet, StatusBar, View, ActivityIndicator, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNotification, validate } from './functions/backendFetch';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useState } from 'react';
import { useNotifications } from './functions/useNotifications';
import { QueryClient, QueryClientProvider } from "react-query";
import { useDispatch, useSelector } from 'react-redux';
import { storeData } from './functions/localstorage';
import * as Notifications from "expo-notifications";
import NotLogged from './components/NotLogged';
import LoggedIn from './components/LoggedIn';
import PopDown from './components/PopDown';
import { Provider } from 'react-redux';
import { Store } from './redux/types';
import { useFonts } from 'expo-font';
import store from './redux/store';

function Root() {
    const userData = useSelector((state: Store) => state.userData);
    const error = useSelector((state: Store) => state.error);
    const token = useSelector((state: Store) => state.token);
    const [ loading, setLoading ] = useState(false);
    const [ responseListener, setResponseListener ] = useState(null);
    const { registerForPushNotificationAsync } = useNotifications();
    const [ fontsLoaded ] = useFonts({ 'Poppins-SemiBold': require('./assets/Poppins-SemiBold.ttf') });
    const onLayoutRootView = useCallback(async () => console.log(fontsLoaded ? "Fonts Loaded" : "Fonts Not Loaded"), [fontsLoaded]);
    const dispatch = useDispatch();

    async function fetchValidation() {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if(value === null) return false;

        setLoading(true);
        const data = await validate(value);

        if (data.error || !data.data) {
          storeData("");
          setLoading(false);
          return false;
        }

        dispatch(setToken(value));
        dispatch(setUserData(data.data.userData));

        if (Platform.OS === "web") {
          setLoading(false);
          return true;
        }

        const token2 = await registerForPushNotificationAsync();
        if (!token2) {
          setLoading(false);
          return true;
        }

        const data2 = await addNotification(value, token2);
        if (!data2.error) {
          console.log("Notifications Enabled.");
        }

        setLoading(false);
        return true;
      } catch(e) {
        setLoading(false);
        return false;
      }
    }

    async function startup() {
      if (Platform.OS !== "web") {
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true
          }),
        });

        console.log("Setting the notification response.")
        const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
            const data: { type?: "join" | "job", groupId?:string, jobId?: string, jobTitle?: string} = response.notification.request.content.data;
            console.log({msg: "Notification responder.", data});
            if (data.type === "join" && data.groupId) {
                dispatch(setSelected("groups"));
                setTimeout(() => {
                  dispatch(setClickGroup(data.groupId))
                }, 100);
            } else if (data.type === "job" && data.jobId && data.jobTitle) {
              console.log("Setting the job selected.");
              dispatch(setJobSelect(data.jobTitle, parseInt(data.jobId)));
            }
        }
        setResponseListener(Notifications.addNotificationResponseReceivedListener(handleNotificationResponse));
      }

      const data = await fetchValidation();
      console.log(data ? "Validation Success." : "Validation Error.");
    }

    useEffect(() => {
      startup();
      return () => {
        if (responseListener) {
          Notifications.removeNotificationSubscription(responseListener);
        }
      }
    }, []);

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color="#3A9FE9" /></View>;
  }
  
  return (
      <SafeAreaProvider style={styles.main} onLayout={onLayoutRootView}>
        {error.show ? <PopDown message={error.message} type={error.type}/>: null}
        <StatusBar backgroundColor="#DFDFDF" barStyle="dark-content"/>
        {userData && token ? <LoggedIn /> : <NotLogged loading={setLoading} />}
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%"
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
});

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Root />
      </Provider>
    </QueryClientProvider>
  );
}