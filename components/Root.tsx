import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GoogleLoginData, GroupsType, validate } from '../functions/backendFetch';
import LoggedIn from './loggedIn/LoggedIn';
import NotLogged from './NotLogged';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../redux/reducers';
import { storeData } from '../functions/localstorage';
import PopDown from './PopDown';
import { SOCKET_SERVER } from '../functions/variables';
import { io } from 'socket.io-client';
import { useNotifications } from '../functions/useNotifications';
SplashScreen.preventAutoHideAsync();

export default function Root() {
    const groups = useSelector<ReduxState, ReduxState["groups"]>((state: ReduxState) => state.groups);
    const pendingGroups = useSelector<ReduxState, ReduxState["pendingGroups"]>((state: ReduxState) => state.pendingGroups);
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

  if (token && userData) {
    const socket = io(SOCKET_SERVER);

    socket.emit("init", token);

    socket.on("data", (data) => {
      console.log(data);
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("deleted", (data) => {
      console.log(`${data} is deleted`);
      let newGroups = [];
      console.log(groups);
      let groupName: string;
      for (let i=0;i<groups.length;i++) {
        if (groups[i].groupId!=data) {
          newGroups.push(groups[i]);
        } else {
          groupName = groups[i].groupName;
        }
      }
      dispatch({ type: "SET_ERROR", payload: {message: `The group: "${groupName}" was deleted`, type: "default", show: true} });
      dispatch({ type: "SET_USER_GROUPS", payload: newGroups });
    });

    socket.on("pendingDeleted", (data) => {
      console.log(`Pending group ${data} is deleted.`);
      console.log(pendingGroups);
      let newPendingGroups = [];
      let groupName: string;
      for (let i=0;i<pendingGroups.length;i++) {
        if (pendingGroups[i].groupId != data) {
          newPendingGroups.push(pendingGroups[i]);
        } else {
          groupName = pendingGroups[i].groupName;
        }
      }
      dispatch({ type: "SET_ERROR", payload: {message: `The group: "${groupName}" was deleted`, type: "default", show: true} });
      dispatch({ type: "SET_USER_PENDING_GROUPS", payload: newPendingGroups });
    });

    socket.on("groupAccepted", (data) => {
      const { groupId, owner, othersCanAdd } = data;
      let currentGroup: GroupsType;
      console.log(`Pending group ${groupId} is accepted.`);
      let newPendingGroups = [];
      for (let i=0;i<pendingGroups.length;i++) {
        if (pendingGroups[i].groupId != groupId) {
          newPendingGroups.push(pendingGroups[i]);
        } else {
          currentGroup = {...pendingGroups[i], groupOwner: owner, othersCanAdd};
        }
      }
      dispatch({ type: "SET_USER_PENDING_GROUPS", payload: newPendingGroups });
      dispatch({ type: "SET_USER_GROUPS", payload: [...groups, currentGroup] });
      dispatch({ type: "SET_ERROR", payload: {message: `You're now part of "${currentGroup}".`, type: "success", show: true} });
    });

    socket.on("groupRemove", (data) => {
      let newGroups = [];
      console.log(groups);
      let groupName: string;
      for (let i=0;i<groups.length;i++) {
        if (groups[i].groupId!=data) {
          newGroups.push(groups[i]);
        } else {
          groupName = groups[i].groupName;
        }
      }
      dispatch({ type: "SET_ERROR", payload: {message: `The group: "${groupName}" was deleted`, type: "default", show: true} });
      dispatch({ type: "SET_USER_GROUPS", payload: newGroups });
    });

    socket.on("pendingGroupRemove", (data) => {
      let newGroups = [];
      console.log(groups);
      let groupName: string;
      for (let i=0;i<pendingGroups.length;i++) {
        if (pendingGroups[i].groupId!=data) {
          newGroups.push(pendingGroups[i]);
        } else {
          groupName = pendingGroups[i].groupName;
        }
      }
      dispatch({ type: "SET_ERROR", payload: {message: `The group: "${groupName}" was deleted`, type: "default", show: true} });
      dispatch({ type: "SET_USER_PENDING_GROUPS", payload: newGroups });
    });
    socket.on("newGroupOwner", ({groupId, newOwner}) => {
      let newGroups: GroupsType[] = [];
      let groupName: string;
      for (let i=0;i<groups.length;i++) {
        if (groups[i].groupId==groupId) {
          const newGroup2 = Object.create(groups[i]);
          groupName = groups[i].groupName;
          newGroup2.groupOwner = newOwner;
          newGroups.push(newGroup2);
        } else {
          newGroups.push(groups[i]);
        }
      }
      dispatch({ type: "SET_ERROR", payload: {message: `${newOwner} is the new owner of ${groupName}`, type: "success", show: true} });
      dispatch({ type: "SET_USER_GROUPS", payload: newGroups });
    });
    socket.on("newPendingUser", ({groupId, newUser}) => {
      console.log(`${newUser} wants to join ${groupId}`)
    });
  }

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