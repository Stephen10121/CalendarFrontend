import { StyleSheet, StatusBar, View, ActivityIndicator, Platform } from "react-native";
import { setClickGroup, setJobSelect, setSelected, setToken, setUserData } from "../redux/actions";
import { addNotification, validate } from '../functions/backendFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNotifications } from '../functions/useNotifications';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeData } from '../functions/localstorage';
import * as Notifications from "expo-notifications";
import LoggedIn from './loggedIn/LoggedIn';
import { Store } from "../redux/types";
import { useFonts } from 'expo-font';
import NotLogged from './NotLogged';
import PopDown from './PopDown';

export default function Root() {
    // const groups = useSelector((state: Store) => state.groups);
    const pendingGroups = useSelector((state: Store) => state.pendingGroups);
    const userData = useSelector((state: Store) => state.userData);
    const error = useSelector((state: Store) => state.error);
    const token = useSelector((state: Store) => state.token);
    const [ loading, setLoading ] = useState(false);
    // const [ socket, setSocket ] = useState<Socket>(null);
    const [ responseListener, setResponseListener ] = useState(null);
    const { registerForPushNotificationAsync } = useNotifications();
    const [ fontsLoaded ] = useFonts({ 'Poppins-SemiBold': require('../assets/Poppins-SemiBold.ttf') });
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

    // useEffect(() => {
    //   if (token && userData && socket) {
    //     socket.emit("init", token);
    //   }
    // }, [token, userData, socket]);

    useEffect(() => {
      console.log(pendingGroups);
    }, [pendingGroups]);

    // function socket2() {
    //   socket.on("deleted", (data) => {
    //     let newGroups = [];
    //     let groupName: string;
    //     for (let i=0;i<groups.length;i++) {
    //       if (groups[i].groupId!=data) {
    //         newGroups.push(groups[i]);
    //       } else {
    //         groupName = groups[i].groupName;
    //       }
    //     }
    //     dispatch(setError({message: `The group: "${groupName}" was deleted`, type: "default", show: true}));
    //     dispatch(setUserGroups(newGroups));
    //   });
  
    //   socket.on("pendingDeleted", (data) => {
    //     let newPendingGroups = [];
    //     let groupName: string;
    //     for (let i=0;i<pendingGroups.length;i++) {
    //       if (pendingGroups[i].groupId != data) {
    //         newPendingGroups.push(pendingGroups[i]);
    //       } else {
    //         groupName = pendingGroups[i].groupName;
    //       }
    //     }
    //     dispatch(setError({message: `The group: "${groupName}" was deleted`, type: "default", show: true}));
    //     dispatch(setUserPendingGroups(newPendingGroups));
    //   });
  
    //   socket.on("groupAccepted", (data) => {
    //     console.log("Group Accepted");
    //     const { groupId, owner, othersCanAdd } = data;
    //     let currentGroup: GroupsType;
    //     let newPendingGroups: PendingGroupsType[] = [];
    //     console.log(pendingGroups);
    //     for (let i=0;i<pendingGroups.length;i++) {
    //       console.log(pendingGroups[i].groupId, groupId);
    //       if (pendingGroups[i].groupId === groupId) {
    //         currentGroup = {...pendingGroups[i], groupOwner: owner, othersCanAdd, youOwn: false, notification: true};
    //         continue
    //       }
    //       newPendingGroups.push(pendingGroups[i]);
    //     }
    //     dispatch(setUserPendingGroups(newPendingGroups));
    //     dispatch(setUserGroups([...groups, currentGroup]));
    //     dispatch(setError({message: `You're now part of "${currentGroup.groupName}".`, type: "success", show: true}));
    //   });
  
    //   socket.on("groupRemove", (data: string) => {
    //     console.log(groups);
    //     let newGroups = [];
    //     let groupName: string;
    //     for (let i=0;i<groups.length;i++) {
    //       if (groups[i].groupId!=data) {
    //         newGroups.push(groups[i]);
    //       } else {
    //         groupName = groups[i].groupName;
    //       }
    //     }
    //     dispatch(setError({message: `You're not in "${groupName}" anymore.`, type: "default", show: true}));
    //     dispatch(setUserGroups(newGroups));
    //   });
  
    //   socket.on("pendingGroupRemove", (data) => {
    //     let newGroups = [];
    //     let groupName: string;
    //     for (let i=0;i<pendingGroups.length;i++) {
    //       if (pendingGroups[i].groupId!=data) {
    //         newGroups.push(pendingGroups[i]);
    //       } else {
    //         groupName = pendingGroups[i].groupName;
    //       }
    //     }
    //     dispatch(setError({message: `You are not pending in "${groupName}" anymore.`, type: "default", show: true}));
    //     dispatch(setUserPendingGroups(newGroups));
    //   });

    //   socket.on("newGroupOwner", ({groupId, newOwner}) => {
    //     let newGroups: GroupsType[] = [];
    //     let groupName: string;
    //     for (let i=0;i<groups.length;i++) {
    //       if (groups[i].groupId==groupId) {
    //         const newGroup2 = Object.create(groups[i]);
    //         groupName = groups[i].groupName;
    //         newGroup2.groupOwner = newOwner;
    //         newGroups.push(newGroup2);
    //       } else {
    //         newGroups.push(groups[i]);
    //       }
    //     }
    //     dispatch(setError({message: `${newOwner} is the new owner of ${groupName}`, type: "success", show: true}));
    //     dispatch(setUserGroups(newGroups));
    //   });
  
    //   socket.on("newPendingUser", ({groupId, newUser}) => {
    //     console.log(`${newUser} wants to join ${groupId}`)
    //   });
    // }

    // useEffect(() => {
    //   console.log(socket);
    //   if (socket) {
    //     socket2();
    //   }
    // }, [socket]);

    async function startup() {
      // setSocket(io(SOCKET_SERVER));
      const data = await fetchValidation();
      console.log(data ? "Validation Success." : "Validation Error.");

      if (Platform.OS === "web") {
        return;
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true
        }),
      });

      const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
          const data: { type?: "join" | "job", groupId?:string, jobId?: string, jobTitle?: string} = response.notification.request.content.data;
          if (data.type === "join" && data.groupId) {
              dispatch(setSelected("groups"));
              setTimeout(() => {
                dispatch(setClickGroup(data.groupId))
              }, 100);
          } else if (data.type === "job" && data.jobId && data.jobTitle) {
            dispatch(setJobSelect(data.jobTitle, parseInt(data.jobId)));
          }
      }
      setResponseListener(Notifications.addNotificationResponseReceivedListener(handleNotificationResponse));
    }

    useEffect(() => {
      startup();
      return () => {
        // if (socket) {
        //   socket.disconnect();
        // }
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