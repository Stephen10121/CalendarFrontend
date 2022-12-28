import { GoogleLoginData, GroupsType, PendingGroupsType } from "../functions/backendFetch";
import { JobType } from "../functions/jobFetch";
import { Error } from "./actions";
import { Selected } from "../components/navigation/Navigation";

export interface UserJobsStore {
    groupId: string;
    jobs: JobType[]
}

export interface Store {
    userJobs: UserJobsStore[];
    userAllJobs: JobType[];
    token: null | string;
    userData: GoogleLoginData | null;
    groups: GroupsType[];
    pendingGroups: PendingGroupsType[];
    error: Error;
    selected: Selected;
    clickGroup: string;
}