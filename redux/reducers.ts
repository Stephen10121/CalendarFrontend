import { GoogleLoginData, GroupInfoData, GroupsType, PendingGroupsType } from "../functions/backendFetch";
import { SET_USER_DATA, SET_USER_TOKEN } from "./actions";

export type ErrorType = "alert" | "success" | "default";

export interface Error {
    show: boolean;
    type?: ErrorType;
    message: string;
}

export interface ReduxState {
    token: null | string;
    userData: GoogleLoginData | null;
    groups: GroupsType[];
    pendingGroups: PendingGroupsType[];
    error: Error,
}

const initialState: ReduxState = {
    token: null,
    userData: null,
    groups: [],
    pendingGroups: [],
    error: { show: false, message: "N/A" }
}


type Action = {
    type: "SET_USER_DATA" | "SET_USER_TOKEN" | "SET_USER_GROUPS" | "SET_USER_PENDING_GROUPS" | "SET_ERROR",
    payload: any;
}

export default function userReducer(state: ReduxState = initialState, action: Action)  {
    switch(action.type) {
        case "SET_USER_DATA":
            return {...state, userData: action.payload}
        case "SET_USER_TOKEN":
            return {...state, token: action.payload}
        case "SET_USER_GROUPS":
            return {...state, groups: action.payload}
        case "SET_USER_PENDING_GROUPS":
            return {...state, pendingGroups: action.payload}
        case "SET_ERROR":
            return {...state, error: action.payload}
        default:
            return state;
    }
}