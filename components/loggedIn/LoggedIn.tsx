import { Dimensions, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import HomeSection from '../homesection/HomeSection';
import GroupSection from '../GroupSection';
import { fetchGroups, FetchGroupsResponse } from '../../functions/backendFetch';
import Account from '../Account';
import { useDispatch, useSelector } from 'react-redux';
import AddJobSection from '../AddJobSection';
import { getJobs, JobType } from '../../functions/jobFetch';
import { Store, UserJobsStore } from '../../redux/types';
import { setUserAllJobs, setUserGroups, setUserJobs, setUserPendingGroups } from '../../redux/actions';
import { useQuery } from "react-query";

export type RemoveGroup = (groupId: string) => void;
export type RemovePendingGroup = (pendingGroupId: string) => void;

export default function LoggedIn() {
  const userData = useSelector((state: Store) => state.userData);
  const token = useSelector((state: Store) => state.token);
  const { status, error, data } = useQuery<FetchGroupsResponse, Error>(["groups"], () => {
    return fetchGroups(token);
  }, {
    staleTime: 30000,
    refetchInterval: 30000
  });
  const selected = useSelector((state: Store) => state.selected);
  const [error2, setError] = useState("");
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
      dispatch(setUserAllJobs(allJobs));
      dispatch(setUserJobs(userJobs));
      dispatch(setUserGroups(data.data.groups));
    }
    if (data.data.pendingGroups) {
      dispatch(setUserPendingGroups(data.data.pendingGroups));
    }
  }

  useEffect(() => {
    console.log(data, error, status);
    // fetcher().then(() => {
    //   console.log("Done Fetching.")
    // });
  }, []);

 async function setGroupsAndJobs() {
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
    dispatch(setUserAllJobs(allJobs));
    dispatch(setUserJobs(userJobs));
    dispatch(setUserGroups(data.data.groups));
  }
  if (data.data.pendingGroups) {
    dispatch(setUserPendingGroups(data.data.pendingGroups));
  } else {
    dispatch(setUserPendingGroups([]));
  }
 }

  useEffect(() => {
    console.log(data, error, status);
    if (status === "success") {
      setGroupsAndJobs();
    }
  }, [status, data]);

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
          <GroupSection error={error2}/>
        </View>
        <View style={styles.sectionJob}>
          <AddJobSection />
        </View>
      </View>
      {selected !== "account" ? <Navigation selected={selected} profilePic={userData.picture}/> : <Account />}
    </View>
  );
}