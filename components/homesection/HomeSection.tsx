import { View, StyleSheet, ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeJob from '../homeJob/HomeJob';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/reducers';
import { dateMaker } from '../../functions/dateConversion';
import { JobType } from '../../functions/jobFetch';

export default function HomeSection({ name }: {name: string}) {
    const userAllJobs = useSelector<ReduxState, ReduxState["userAllJobs"]>((state: ReduxState) => state.userAllJobs);
    const userData = useSelector<ReduxState, ReduxState["userData"]>((state: ReduxState) => state.userData);
    const [myJobs, setMyJobs] = useState<JobType[]>([]);
    const [availableJobs, setAvailableJobs] = useState<JobType[]>([]);
    function jobClicked(job: JobType) {
        console.log(job);
    }

    function filterMyJobs() {
        const prevJobs = [];
        const prevAvailableJobs = [];
        for (let i=0;i<userAllJobs.length;i++) {
            if (userAllJobs[i].volunteer.length !== 0) {
                const volunteer: number[] = JSON.parse(userAllJobs[i].volunteer);
                if (volunteer) {
                    if (volunteer.includes(userData.ID)) {
                        console.log(userData);
                        prevJobs.push(userAllJobs[i]);
                    } else {
                        prevAvailableJobs.push(userAllJobs[i]);
                    }
                } else {
                    prevAvailableJobs.push(userAllJobs[i]);
                }
            } else {
                prevAvailableJobs.push(userAllJobs[i]);
            }
        }
        setAvailableJobs(prevAvailableJobs);
        setMyJobs(prevJobs);
    }

    useEffect(() => {
        console.log("UserAllJobs length changed.");
        filterMyJobs();
    }, [userAllJobs.length]);

  return (
    <ScrollView style={styles.home}>
        <View style={styles.greeting}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.name}>{name}</Text>
        </View>
        {myJobs.length !== 0 ? <View style={styles.comingUp}>
            <Text style={styles.title}>Coming up</Text>
            <View style={styles.comingUpList}>
                {myJobs.map((job) => <HomeJob key={`job${job.groupId}${job.ID}`} name={job.jobTitle} client={job.client ? job.client : "No Client"} time={dateMaker(job)} id={job.ID} click={()=>jobClicked(job)}/>)}
            </View>
        </View> : null}
        {availableJobs.length !== 0 ? <View style={styles.available}>
            <Text style={styles.title}>Available</Text>
            <View style={styles.comingUpList}>
                {availableJobs.map((job) => <HomeJob key={`job${job.groupId}${job.ID}`} name={job.jobTitle} client={job.client ? job.client : "No Client"} time={dateMaker(job)} id={job.ID} click={()=>jobClicked(job)}/>)}
            </View>
        </View> : null}
        {availableJobs.length === 0 && myJobs.length===0 ? <View style={styles.noJobs}><Text style={styles.noJobText}>No jobs.</Text></View> : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        backgroundColor: "#DFDFDF",
        paddingBottom: 10
    },
    greeting: {
        width: "100%",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    welcome: {
        fontSize: 40,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    name: {
        fontSize: 30,
        fontWeight: "900",
        color: "#3A9FE9",
        fontFamily: "Poppins-SemiBold"
    },
    comingUp: {
        width: "100%",
        paddingHorizontal: 23
    },
    title: {
        fontSize: 23,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    },
    comingUpList: {
        paddingTop: 10,
        flexDirection: "column",
    },
    available: {
        width: "100%",
        paddingHorizontal: 23,
        marginTop: 20,
        marginBottom: 10
    },
    noJobs: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    noJobText: {
        fontSize: 13,
        fontWeight: "900",
        color: "#000000",
        fontFamily: "Poppins-SemiBold"
    }
});