import { Dimensions, StyleSheet, View, Text, Touchable, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navigation, { Selected } from '../navigation/Navigation';
import HomeSection from '../homesection/HomeSection';
import GroupSection from '../GroupSection';
import { fetchGroups, GoogleLoginData } from '../../functions/backendFetch';
import Account from '../Account';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState, UserJobsStore } from '../../redux/reducers';
import AddJobSection from '../AddJobSection';
import { getJobs, JobType } from '../../functions/jobFetch';

export type RemoveGroup = (groupId: string) => void;
export type RemovePendingGroup = (pendingGroupId: string) => void;

export default function LoggedIn() {
  const userData = useSelector<ReduxState, GoogleLoginData>((state: ReduxState) => state.userData);
  const token = useSelector<ReduxState, string>((state: ReduxState) => state.token);
  const selected = useSelector<ReduxState, Selected>((state: ReduxState) => state.selected);
  const [error, setError] = useState("");
  const win = Dimensions.get('window');
  const dispatch = useDispatch();

  async function fetcher() {
    const data = await fetchGroups(token)
    console.log("Fetched Groups");
    if (data.error != ""|| !data.data) {
        setError(data.error);
        return
    }
    if (data.data.groups !== null) {
      let userJobs: UserJobsStore[] = [];
      let allJobs: JobType[] = [];
      for (let i=0;i<data.data.groups.length;i++) {
        const data2 = await getJobs(token, data.data.groups[i].groupId);
        console.log(`Fetched Jobs from ${data.data.groups[i].groupId}`);
        if (data2.error) {
          console.log(data2.error);
          return
        }
        if (data2.jobs) {
          allJobs.push(...data2.jobs);
          userJobs.push({ groupId: data.data.groups[i].groupId, jobs: data2.jobs });
        }
      }
      dispatch({ type: "SET_USER_ALL_JOBS", payload: allJobs });
      dispatch({ type: "SET_USER_JOBS", payload: userJobs });
      dispatch({ type: "SET_USER_GROUPS", payload: data.data.groups });
    }
    if (data.data.pendingGroups) {
      dispatch({ type: "SET_USER_PENDING_GROUPS", payload: data.data.pendingGroups });
    }
  }

  useEffect(() => {
    fetcher().then(() => {
      console.log("Done Fetching.")
    });
  }, []);

  const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        backgroundColor: "#dfdfdf"
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
      display: selected === "home" ? "flex" : 'none',
      position: "relative"
    },
    sectionCal: {
      width: "100%",
      height: win.height - 70,
      display: selected === "calendar" ? "flex" : 'none'
    },
    sectionGroup: {
      width: "100%",
      height: win.height - 70,
      display: selected === "groups" ? "flex" : 'none'
    },
    sectionJob: {
      width: "100%",
      height: win.height - 70,
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
          <Text>{JSON.stringify(userData)}</Text>
        </View>
        <View style={styles.sectionGroup}>
          <GroupSection error={error}/>
        </View>
        <View style={styles.sectionJob}>
          <AddJobSection />
        </View>
      </View>
      {selected !== "account" ? <Navigation selected={selected} profilePic={userData.picture}/> : <Account />}
    </View>
  );
}