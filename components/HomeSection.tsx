import { View, StyleSheet, ScrollView, Text } from 'react-native';
import RenderAvailableJobs from './RenderAvailableJobs';
import React, { useEffect, useState } from 'react';
import { JobType } from '../functions/jobFetch';
import SlideUp, { Border, SlideUpData } from './SlideUp';
import RenderMyJobs from './RenderMyJobs';
import { useSelector } from 'react-redux';
import { Store } from '../redux/types';
import JobInfo from './JobInfo';

export default function HomeSection({ name, setShowSlideUp, setSlideUpBorderColor, setCloseInternal }: { name: string, setShowSlideUp: React.Dispatch<React.SetStateAction<SlideUpData>>, setSlideUpBorderColor: React.Dispatch<React.SetStateAction<Border>>, setCloseInternal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const userData = useSelector((state: Store) => state.userData);
    const jobs = useSelector((state: Store) => state.jobs);
    const jobSelected = useSelector((state: Store) => state.jobSelected);

    useEffect(() => {
        console.log("Checking if job selected.")
        if (jobSelected) {
            setShowSlideUp({ show: true, header: jobSelected.title, children: <JobInfo changeBorder={borderChange} id={jobSelected.id} myJob={false} close={() => setCloseInternal(true)}/>});
            setSlideUpBorderColor("blue");
        }
    }, [jobSelected]);

    function borderChange(color: Border) {
        setSlideUpBorderColor(color);
    }

    function jobClicked(job: JobType, myJob?: boolean) {
        setShowSlideUp({ show: true, header: job.jobTitle, children: <JobInfo changeBorder={borderChange} id={job.ID} myJob={myJob} close={() => setCloseInternal(true)} baseInfo={job}/> });
        setSlideUpBorderColor(job.taken ? "red" : "blue");
    }

    return (
        <View style={styles.home}>
            <ScrollView style={styles.home2}>
                <View style={styles.greeting}>
                    <Text style={styles.welcome}>Welcome</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={styles.comingUp}>
                    <Text style={styles.title}>Coming up</Text>
                    <View style={styles.comingUpList}>
                        <RenderMyJobs jobs={jobs} jobClicked={jobClicked} userId={userData.ID} />
                    </View>
                </View>
                <View style={styles.available}>
                    <Text style={styles.title}>Available</Text>
                    <View style={styles.comingUpList}>
                        <RenderAvailableJobs jobs={jobs} jobClicked={jobClicked} userId={userData.ID} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        backgroundColor: "#DFDFDF",
        position: "relative"
    },
    home2: {
        width: "100%",
        overflow: "scroll",
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