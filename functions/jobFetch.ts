import { POST_SERVER } from "./variables";

export interface JobType {
    CreatedAt: string;
    DeletedAt: string;
    ID: number;
    client: string;
    address: string;
    volunteer: string;
    month: number;
    day: number;
    year: number;
    hour: number;
    minute: number;
    pm: boolean;
    jobTitle: string;
    groupId: string;
    instructions: string;
    groupName: string;
    issuer: number;
    issuerName: string;
    taken: boolean;
    positions: number;
}

export interface JobToAdd {
    client: string;
    address: string;
    month: number;
    day: number;
    year: number;
    hour: number;
    minute: number;
    pm: boolean;
    jobTitle: string;
    group: string;
    notifications: boolean;
    instructions: string;
    positions: number;
}

export interface AddJobResponse {
    error?: string;
    message?: string;
    return?: JobType
}

export async function addJob(token: string, job: JobToAdd): Promise<AddJobResponse> {
    if (job.day === 0 || job.month === 0 || job.year === 0) {
        return {error: "Invalid Date"};
    }
    if (job.hour === 0 || job.minute === 0) {
        return {error: "Invalid Time"};
    }
    if (job.jobTitle.length === 0) {
        return {error: "You Must add a job title."};
    }
    if (job.group.length === 0) {
        return {error: "Group not selected."};
    }
    if (job.positions <= 0) {
        return {error: "Positions must be greater than '0'"};
    } 
    try {
      const groups = await fetch(`${POST_SERVER}/addJob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
          "client": job.client,
          "address": job.address,
          "date": {
            "month": job.month,
            "day": job.day,
            "year": job.year
          },
          "time": {
            "hour": job.hour,
            "minute": job.minute,
            "pm": job.pm ? "PM" : "AM"
          },
          "jobTitle": job.jobTitle,
          "group": job.group,
          "notifications": job.notifications,
          "instructions": job.instructions,
          "positions": job.positions
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: groupsJson.error}
      }
      return {message: groupsJson.message, return: groupsJson.return};
    } catch (err) {
      console.error(err);
      return {error: "Error adding job"};
    }
}

export interface GetJobsResponse {
    error?: string;
    jobs?: JobType[];
}

export async function getJobs(token: string, groupId: string): Promise<GetJobsResponse> {
    try {
      const groups = await fetch(`${POST_SERVER}/getJobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "omit",
        body: JSON.stringify({
            "group": groupId,
        })
      })
      const groupsJson = await groups.json();
      if (groupsJson.error) {
        return {error: groupsJson.error}
      }
      return {jobs: groupsJson.jobs}
    } catch (err) {
      console.error(err);
      return {error: "Error Fetching Jobs"};
    }
}