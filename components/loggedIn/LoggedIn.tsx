import { Dimensions, StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Navigation from '../navigation/Navigation';
import HomeSection from '../homesection/HomeSection';
import GroupSection from '../GroupSection';
import { fetchGroups, FetchGroupsResponse } from '../../functions/backendFetch';
import Account from '../Account';
import { useDispatch, useSelector } from 'react-redux';
import AddJobSection from '../AddJobSection';
import { getJobs, getJobsByDate, GetJobsResponse, JobType } from '../../functions/jobFetch';
import { JobMonths, Store, UserJobsStore } from '../../redux/types';
import { setJobs, setUserAllJobs, setUserGroups, setUserJobs, setUserPendingGroups } from '../../redux/actions';
import { useQuery } from "react-query";
import { Temporal } from '@js-temporal/polyfill';
import addJobMonth from '../../functions/addJob';

export type RemoveGroup = (groupId: string) => void;
export type RemovePendingGroup = (pendingGroupId: string) => void;

export default function LoggedIn() {
  // Redux Stores
  const userData = useSelector((state: Store) => state.userData);
  const token = useSelector((state: Store) => state.token);
  const selected = useSelector((state: Store) => state.selected);
  const jobs = useSelector((state: Store) => state.jobs);

  // Other Variables
  const now = Temporal.Now.plainDateTimeISO();
  const month = now.month;
  const year = now.year;
  const win = Dimensions.get('window');
  const dispatch = useDispatch();

  // Group Fetch
  const groupFetch = useQuery<FetchGroupsResponse, Error>(["groups"], () => fetchGroups(token), { staleTime: 30000, refetchInterval: 30000 });
  const thisMonthJobs = useQuery<GetJobsResponse, Error>([`jobFetch${month}${year}`], () => getJobsByDate(token, month, year), { staleTime: 30000, refetchInterval: 30000 });

 async function setGroupsAndJobs(data: FetchGroupsResponse) {
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
    const { data, status } = groupFetch;
    if (status === "success") {
      setGroupsAndJobs(data);
    }
  }, [groupFetch.status, groupFetch.data]);

  useEffect(() => {
    const { data, status } = thisMonthJobs;
    if (status !== "success") return
    if (data.jobs) {
      const monthJob: JobMonths = {
        month,
        jobs: data.jobs
      }
      dispatch(setJobs(addJobMonth(jobs, year, monthJob)));
    }
  }, [thisMonthJobs.status, thisMonthJobs.data]);

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
          <GroupSection />
        </View>
        <View style={styles.sectionJob}>
          <AddJobSection />
        </View>
      </View>
      {selected !== "account" ? <Navigation selected={selected} profilePic={userData.picture}/> : <Account />}
    </View>
  );
}