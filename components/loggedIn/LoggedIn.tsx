import { Dimensions, StyleSheet, View, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navigation, { Selected } from '../navigation/Navigation';
import HomeSection from '../homesection/HomeSection';
import GroupSection from '../GroupSection';
import { fetchGroups, GoogleLoginData, GroupsType, PendingGroupsType } from '../../functions/backendFetch';
import Account from '../Account';

export type RemoveGroup = (groupId: string) => void;
export type RemovePendingGroup = (pendingGroupId: string) => void;

export default function LoggedIn({ userData, logout, token }: {userData: GoogleLoginData, logout: () => void, token: string }) {
  const [groups, setGroups] = useState<Array<GroupsType>>([]);
  const [pendingGroups, setPendingGroups] = useState<Array<PendingGroupsType>>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Selected>("groups");
  const win = Dimensions.get('window');
  
  function removePendingGroup(groupId: string) {
    let newGroups = [];
    for (let i=0;i<pendingGroups.length;i++){
      if (pendingGroups[i].groupId !== groupId) {
        newGroups.push(groups[i]);
      }
    }
    setPendingGroups(newGroups);
  }

  function removeGroup(groupId: string) {
    let newGroups = [];
    for (let i=0;i<groups.length;i++){
      if (groups[i].groupId !== groupId) {
        newGroups.push(groups[i]);
      }
    }
    setGroups(newGroups);
  }

  useEffect(() => {
    fetchGroups(token).then((data) => {
      if (data.error != ""|| !data.data) {
          setError(data.error);
          return
      }
      if (data.data.groups !== null) {
        setGroups(data.data.groups);
      }
      if (data.data.pendingGroups) {
        setPendingGroups(data.data.pendingGroups);
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
          <GroupSection removePendingGroup={removePendingGroup} addGroup={(group: GroupsType) => setGroups([...groups, group])} removeGroup={removeGroup} addPendingGroup={(group: PendingGroupsType) => setPendingGroups([...pendingGroups, group])} error={error} groups={groups} pendingGroups={pendingGroups} token={token}/>
        </View>
        <View style={styles.sectionJob}>
          <Text>Add Job</Text>
          <Text>{JSON.stringify(userData)}</Text>
        </View>
      </View>
      {selected !== "account" ? <Navigation selected={selected} clicked={setSelected} profilePic={userData.picture}/> : <Account selected={setSelected} logout={logout}/>}
    </View>
  );
}