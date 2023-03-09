import { getJobsByDates, GetJobsByDatesResponse, JobType } from '../functions/jobFetch';
import { setJobs, setUserGroups, setUserPendingGroups } from '../redux/actions';
import { fetchGroups, FetchGroupsResponse } from '../functions/backendFetch';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { JobMonths, Store } from '../redux/types';
import CalendarSection from './CalendarSection';
import addJobMonth from '../functions/addJob';
import AddJobSection from './AddJobSection';
import GroupSection from './GroupSection';
import React, { useEffect } from 'react';
import LoadingIcon from './LoadingIcon';
import HomeSection from './HomeSection';
import { useQuery } from "react-query";
import Navigation from './Navigation';
import Account from './Account';

export type RemoveGroup = (groupId: string) => void;
export type RemovePendingGroup = (pendingGroupId: string) => void;

export default function LoggedIn() {
  // Redux Stores
  const userData = useSelector((state: Store) => state.userData);
  const token = useSelector((state: Store) => state.token);
  const selected = useSelector((state: Store) => state.selected);
  const jobs = useSelector((state: Store) => state.jobs);
  const loading = useSelector((state: Store) => state.loading);

  // Other Variables
  const now = new Date();;
  const month = 2//now.getUTCMonth() + 1;
  const year = now.getUTCFullYear();
  const win = Dimensions.get('window');
  const dispatch = useDispatch();

  // Group Fetch
  const groupFetch = useQuery<FetchGroupsResponse, Error>(["groups"], () => fetchGroups(token), { staleTime: 30000, refetchInterval: 30000 });
  const threeMonthJobs = useQuery<GetJobsByDatesResponse, Error>([`initialJobsFetch`], () => getJobsByDates(token, [month-1, month, month+1], year), { staleTime: 30000, refetchInterval: 30000 });

 async function setGroupsAndJobs(data: FetchGroupsResponse) {
  if (data.data.groups !== null) dispatch(setUserGroups(data.data.groups))
  dispatch(setUserPendingGroups(data.data.pendingGroups ? data.data.pendingGroups: []));
 }

  useEffect(() => {
    const { data, status } = groupFetch;
    if (status === "success") {
      setGroupsAndJobs(data);
    }
  }, [groupFetch.status, groupFetch.data]);

  useEffect(() => {
    const { data, status } = threeMonthJobs;
    if (status !== "success") return
    console.log("Fetched 3 months jobs.");
    
    if (data.jobs) {
      const jobArray = data.jobs;
      let newJobsObject = jobs;
      
      for (let i=0;i<Object.keys(jobArray).length;i++) {
        const newJobs = jobArray[Object.keys(jobArray)[i]] as any as JobType[];
        if (newJobs.length===0) continue
        const monthJob: JobMonths = {
          month: parseInt(Object.keys(jobArray)[i]),
          jobs: newJobs
        }
        newJobsObject = addJobMonth(newJobsObject, year, monthJob);
      }
      dispatch(setJobs(newJobsObject));
    }
  }, [threeMonthJobs.status, threeMonthJobs.data]);

  const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        backgroundColor: "#dfdfdf",
        position: "relative"
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
          <CalendarSection />
        </View>
        <View style={styles.sectionGroup}>
          <GroupSection />
        </View>
        <View style={styles.sectionJob}>
          <AddJobSection />
        </View>
      </View>
      {selected !== "account" ? <Navigation selected={selected} profilePic={userData.picture}/> : <Account />}
      {loading ? <LoadingIcon>{loading}</LoadingIcon> : null}
    </View>
  );
}