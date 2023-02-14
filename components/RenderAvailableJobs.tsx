import React from 'react'
import { Store } from '../redux/types'
import { VolunteerType } from './JobInfo';
import HomeJob from './homeJob/HomeJob';
import { dateMaker } from '../functions/dateConversion';
import { JobType } from '../functions/jobFetch';
import { View, Text, StyleSheet } from 'react-native';

export default function RenderAvailableJobs({ jobs, userId, jobClicked }: { jobs: Store["jobs"], userId: number, jobClicked : (job: JobType, myJob?: boolean) => any }) {
    const jobArray = jobs.map((jobYear) => jobYear.months.map((jobMonths) => jobMonths.jobs.map((job) => {
        const volunteers: VolunteerType[] = JSON.parse(job.volunteer);
        if (volunteers) {
            let mine = false;
            for (let b=0;b<volunteers.length;b++) {
                if (volunteers[b].userId === userId) {
                    mine=true
                }
            }
            if (mine) {
                return null;
            }
            return (
                <HomeJob key={`job${job.groupId}${job.ID}`} name={job.jobTitle} client={job.client ? job.client : "No Client"} time={dateMaker(job)} id={job.ID} click={()=>jobClicked(job, true)}/>
            );
        }
        return (
            <HomeJob key={`job${job.groupId}${job.ID}`} name={job.jobTitle} client={job.client ? job.client : "No Client"} time={dateMaker(job)} id={job.ID} click={()=>jobClicked(job, true)}/>
        );
    })));

    return (
        <>
            {jobArray.join("").length === 0 ? <View style={styles.noJobs}><Text style={styles.noJobText}>No jobs.</Text></View> : jobArray}
        </>
    )
}

const styles = StyleSheet.create({
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