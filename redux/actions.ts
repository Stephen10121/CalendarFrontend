import { Selected } from "../components/navigation/Navigation";
import { GoogleLoginData, GroupsType, PendingGroupsType } from "../functions/backendFetch";
import { JobType } from "../functions/jobFetch";
import { JobsStruct, UserJobsStore } from "./types";

export type ErrorType = "alert" | "success" | "default";
export interface Error {
    show: boolean;
    type?: ErrorType;
    message: string;
}

export const SET_USER_DATA = "SET_USER_DATA";
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const SET_USER_GROUPS = "SET_USER_GROUPS";
export const SET_USER_PENDING_GROUPS = "SET_USER_PENDING_GROUPS";
export const SET_ERROR = "SET_ERROR";
export const SET_SELECTED = "SET_SELECTED";
export const SET_CLICK_GROUP = "SET_CLICK_GROUP";
export const SET_USER_JOBS = "SET_USER_JOBS";
export const SET_USER_ALL_JOBS = "SET_USER_ALL_JOBS";
export const SET_LOGOUT = "SET_LOGOUT";
export const SET_JOB = "SET_JOB";

export type ActionTypes = 
{ type: typeof SET_USER_TOKEN; payload: string } | 
{ type: typeof SET_USER_DATA; payload: GoogleLoginData } |
{ type: typeof SET_USER_GROUPS; payload: GroupsType[] } |
{ type: typeof SET_USER_PENDING_GROUPS; payload: PendingGroupsType[] } |
{ type: typeof SET_ERROR; payload: Error } |
{ type: typeof SET_SELECTED; payload: Selected } |
{ type: typeof SET_CLICK_GROUP; payload: string } |
{ type: typeof SET_USER_JOBS; payload: UserJobsStore[] } |
{ type: typeof SET_JOB; payload: JobsStruct[] } |
{ type: typeof SET_USER_ALL_JOBS; payload: JobType[] } |
{ type: typeof SET_LOGOUT };

export const setLogout = (): ActionTypes => ({ type: SET_LOGOUT });
export const setToken = (payload2: string): ActionTypes => ({ type: SET_USER_TOKEN, payload: payload2 });
export const setUserData = (userData: GoogleLoginData): ActionTypes => ({ type: SET_USER_DATA, payload: userData });
export const setUserGroups = (userGroups: GroupsType[]): ActionTypes => ({ type: SET_USER_GROUPS, payload: userGroups });
export const setUserPendingGroups = (userPendingGroups: PendingGroupsType[]): ActionTypes => ({ type: SET_USER_PENDING_GROUPS, payload: userPendingGroups });
export const setError = (error: Error): ActionTypes => ({ type: SET_ERROR, payload: error });
export const setSelected = (selected: Selected): ActionTypes => ({ type: SET_SELECTED, payload: selected });
export const setClickGroup = (clickGroup: string): ActionTypes => ({ type: SET_CLICK_GROUP, payload: clickGroup });
export const setUserJobs = (userJobs: UserJobsStore[]): ActionTypes => ({ type: SET_USER_JOBS, payload: userJobs });
export const setUserAllJobs = (userAllJobs: JobType[]): ActionTypes => ({ type: SET_USER_ALL_JOBS, payload: userAllJobs });
export const setJobs = (jobs: JobsStruct[]): ActionTypes => ({ type: SET_JOB, payload: jobs });