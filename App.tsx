import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoggedIn from './components/loggedIn/LoggedIn';
import NotLogged from './components/NotLogged';
import { GoogleLoginData, validate } from './functions/backendFetch';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [token, setToken] = useState<null | string>(null);
  const [userData, setUserData] = useState<null | GoogleLoginData>(null);
  const [loading, setLoading] = useState(false);
  
  function loggedIn(data: GoogleLoginData, token: string) {
    setUserData(data);
    setToken(token);
    storeData(token);
    setLoading(false);
  }

  function logout() {
    setUserData(null);
    setToken(null);
    storeData(null);
  }

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      return
    }
  }

  useEffect(() => {
    try {
      AsyncStorage.getItem('@storage_Key').then((value) => {
        if(value !== null) {
          setLoading(true);
          validate(value).then((data) => {
            if (data.error || !data.data) {
              storeData(null);
              setToken(null);
              setUserData(null);
              setLoading(false);
              return;
            }
            setToken(value);
            setUserData(data.data.userData);
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
    'Poppins-SemiBold': require('./assets/Poppins-SemiBold.ttf'),
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
      <StatusBar backgroundColor="#DFDFDF"/>
      {userData && token ? <LoggedIn userData={userData} logout={logout} token={token} /> : <NotLogged loading={setLoading} loggedIn={loggedIn}/>}
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

// 664653035536-rskmjba0jmich63i4g8omtk4u66lvbjq.apps.googleusercontent.com
// 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