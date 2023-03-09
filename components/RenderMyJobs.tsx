import React, { useEffect, useState } from 'react'
import { Store } from '../redux/types'
import { VolunteerType } from './JobInfo';
import HomeJob from './HomeJob';
import { dateMaker } from '../functions/dateConversion';
import { JobType } from '../functions/jobFetch';
import { View, Text, StyleSheet } from 'react-native';

function filterJob(jobs: Store["jobs"], userId: number, jobClicked: (job: JobType, myJob?: boolean) => any) {
    let myJobs = [];
    for(let i=0;i<jobs.length;i++) {
        const jobYear = jobs[i];
        for (let b=0;b<jobYear.months.length;b++) {
            const jobMonths = jobYear.months[b];
            for (let c=0;c<jobMonths.jobs.length;c++) {
                const job = jobMonths.jobs[c];
                const volunteers: VolunteerType[] = JSON.parse(job.volunteer);
                if (volunteers) {
                    let mine = false;
                    for (let b=0;b<volunteers.length;b++) {
                        if (volunteers[b].userId === userId) {
                            mine=true
                        }
                    }
                    if (mine) {
                        myJobs.push(<HomeJob key={`job${job.groupId}${job.ID}`} name={job.jobTitle} client={job.client ? job.client : "No Client"} time={dateMaker(job)} id={job.ID} click={()=>jobClicked(job, true)}/>);
                    }
                }
            }
        }
    }
    return myJobs
}

export default function RenderMyJobs({ jobs, userId, jobClicked }: { jobs: Store["jobs"], userId: number, jobClicked : (job: JobType, myJob?: boolean) => any }) {
    const [jobArray, setJobArray] = useState(filterJob(jobs, userId, jobClicked));

    useEffect(() => {
        setJobArray(filterJob(jobs, userId, jobClicked));
    }, [jobs]);

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