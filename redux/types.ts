import { GoogleLoginData, GroupsType, PendingGroupsType } from "../functions/backendFetch";
import { JobType } from "../functions/jobFetch";
import { Error } from "./actions";
import { Selected } from "../components/navigation/Navigation";

export interface UserJobsStore {
    groupId: string;
    jobs: JobType[]
}

export interface JobMonths {
    month: number;
    jobs: JobType[];
}

export type JobsStruct = { year: number, months: JobMonths[] }

export interface Store {
    jobs: JobsStruct[];
    token: null | string;
    userData: GoogleLoginData | null;
    groups: GroupsType[];
    pendingGroups: PendingGroupsType[];
    error: Error;
    selected: Selected;
    clickGroup: string;
}