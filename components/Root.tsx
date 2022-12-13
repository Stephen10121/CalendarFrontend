import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GoogleLoginData, validate } from '../functions/backendFetch';
import LoggedIn from './loggedIn/LoggedIn';
import NotLogged from './NotLogged';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../redux/reducers';
import { storeData } from '../functions/localstorage';
import PopDown from './PopDown';
SplashScreen.preventAutoHideAsync();

export default function Root() {
    const userData = useSelector<ReduxState, GoogleLoginData | null>((state: ReduxState) => state.userData);
    const error = useSelector<ReduxState, ReduxState["error"]>((state: ReduxState) => state.error);
    const token = useSelector<ReduxState, string | null>((state: ReduxState) => state.token);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            AsyncStorage.getItem('@storage_Key').then((value) => {
                if(value !== null) {
                    setLoading(true);
                    validate(value).then((data) => {
                        if (data.error || !data.data) {
                            storeData(null);
                            setLoading(false);
                            return;
                        }
                        dispatch({ type: "SET_USER_TOKEN", payload: value });
                        dispatch({ type: "SET_USER_DATA", payload: data.data.userData });
                        setLoading(false);
                    });
                }
                return;
            });
        } catch(e) {
            return;
        }
    }, []);

  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../assets/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [fontsLoaded]);

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