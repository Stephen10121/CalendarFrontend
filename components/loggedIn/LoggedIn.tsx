import { Dimensions, StyleSheet, View, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navigation, { Selected } from '../navigation/Navigation';
import HomeSection from '../homesection/HomeSection';
import GroupSection from '../GroupSection';
import { fetchGroups, GoogleLoginData, GroupsType, PendingGroupsType } from '../../functions/backendFetch';
import Account from '../Account';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/reducers';

export type RemoveGroup = (groupId: string) => void;
export type RemovePendingGroup = (pendingGroupId: string) => void;

export default function LoggedIn() {
  const userData = useSelector<ReduxState, GoogleLoginData>((state: ReduxState) => state.userData);
  const token = useSelector<ReduxState, string>((state: ReduxState) => state.token);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Selected>("home");
  const win = Dimensions.get('window');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGroups(token).then((data) => {
      if (data.error != ""|| !data.data) {
          setError(data.error);
          return
      }
      if (data.data.groups !== null) {
        dispatch({ type: "SET_USER_GROUPS", payload: data.data.groups });
      }
      if (data.data.pendingGroups) {
        dispatch({ type: "SET_USER_PENDING_GROUPS", payload: data.data.pendingGroups });
      }
    });
  }, []);

  const styles = StyleSheet.create({
    main: {
        backgroundColor: "#f32553",
        width: "100%",
        height: "100%"
    },
    body: {
      height: selected !== "account" ? win.height - 70 : 0,
      display: 'flex',
      flexDirection: "row",
      overflow: 'hidden'
    },
    section: {
      width: "100%",
      height: win.height - 70,
      backgroundColor: "blue",
      display: 'none'
    },
    sectionHome: {
      width: "100%",
      height: win.height - 70,
      backgroundColor: "green",
      display: selected === "home" ? "flex" : 'none',
      position: "relative"
    },
    sectionCal: {
      width: "100%",
      height: win.height - 70,
      backgroundColor: "green",
      display: selected === "calendar" ? "flex" : 'none'
    },
    sectionGroup: {
      width: "100%",
      height: win.height - 70,
      backgroundColor: "green",
      display: selected === "groups" ? "flex" : 'none'
    },
    sectionJob: {
      width: "100%",
      height: win.height - 70,
      backgroundColor: "green",
      display: selected === "addJob" ? "flex" : 'none'
    },
    text: {
      position:"absolute",
      bottom: 0
    }
});
  return (
    <View style={styles.main}>
      <View style={styles.body}>
        <View style={styles.sectionHome}>
          <HomeSection name={userData.name}/>
        </View>
        <View style={styles.sectionCal}>
          <Text>Calendar</Text>
        </View>
        <View style={styles.sectionGroup}>
          <GroupSection error={error}/>
        </View>
        <View style={styles.sectionJob}>
          <Text>Add Job</Text>
          <Text>{JSON.stringify(userData)}</Text>
        </View>
      </View>
      {selected !== "account" ? <Navigation selected={selected} clicked={setSelected} profilePic={userData.picture}/> : <Account selected={setSelected}/>}
    </View>
  );
}