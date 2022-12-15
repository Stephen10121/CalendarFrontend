import { Selected } from "../components/navigation/Navigation";
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
    error: Error;
    selected: Selected;
    clickGroup: string;
}

const initialState: ReduxState = {
    token: null,
    userData: null,
    groups: [],
    pendingGroups: [],
    error: { show: false, message: "N/A" },
    selected: "home",
    clickGroup: null
}


type Action = {
    type: "SET_USER_DATA" | "SET_USER_TOKEN" | "SET_USER_GROUPS" | "SET_USER_PENDING_GROUPS" | "SET_ERROR" | "SET_SELECTED" | "SET_CLICK_GROUP",
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
        case "SET_SELECTED":
            return {...state, selected: action.payload}
        case "SET_CLICK_GROUP":
            return {...state, clickGroup: action.payload}
        default:
            return state;
    }
}