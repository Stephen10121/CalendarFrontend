import { JobMonths, JobsStruct } from "../redux/types";

export default function addJobMonth(jobs: JobsStruct[], year: number, jobsMonth: JobMonths): JobsStruct[] {
    let newJobs: JobsStruct[] = [];
    let yearNotFound = true;
    for (let i=0; i<jobs.length; i++) {
        if (jobs[i].year !== year) {
            newJobs.push(jobs[i]);
            continue;
        }
        yearNotFound = false;
        let monthNotFound = true;
        const newJobsMonths: JobMonths[] = [];
        for (let b=0;b<jobs[i].months.length;b++) {
            if (jobs[i].months[b].month !== jobsMonth.month) {
                newJobsMonths.push(jobs[i].months[b]);
                continue
            }
            monthNotFound = false;
            newJobsMonths.push(jobsMonth);
        }
        if (monthNotFound) {
            newJobsMonths.push(jobsMonth);
        }
        newJobs.push({ year, months: newJobsMonths });
    }
    if (yearNotFound) {
        newJobs.push({ year, months: [ jobsMonth ] });
    }
    return newJobs;
}