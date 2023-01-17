import { legacy_createStore as createStore } from "redux";
import { ActionTypes, SET_CLICK_GROUP, SET_ERROR, SET_LOGOUT, SET_SELECTED, SET_USER_ALL_JOBS, SET_USER_DATA, SET_USER_GROUPS, SET_USER_JOBS, SET_USER_PENDING_GROUPS, SET_USER_TOKEN } from "./actions";
import { Store } from "./types";

const initialState = {
    token: null,
    userData: null,
    groups: [],
    pendingGroups: [],
    error: { show: false, message: "N/A" },
    selected: "home",
    clickGroup: null,
    userJobs: [],
    userAllJobs: []
} as Store;

function userReducer(state: Store = initialState, action: ActionTypes): Store {
    console.log({state, action});
    switch(action.type) {
        case SET_USER_DATA:
            return {...state, userData: action.payload}
        case SET_USER_TOKEN:
            return {...state, token: action.payload}
        case SET_USER_GROUPS:
            return {...state, groups: action.payload}
        case SET_USER_PENDING_GROUPS:
            return {...state, pendingGroups: action.payload}
        case SET_ERROR:
            return {...state, error: action.payload}
        case SET_SELECTED:
            return {...state, selected: action.payload}
        case SET_CLICK_GROUP:
            return {...state, clickGroup: action.payload}
        case SET_USER_JOBS:
            return {...state, userJobs: action.payload}
        case SET_USER_ALL_JOBS:
            return {...state, userAllJobs: action.payload}
        case SET_LOGOUT:
            return { 
                token: null,
                userData: null,
                groups: [],
                pendingGroups: [],
                error: { show: false, message: "N/A" },
                selected: "home",
                clickGroup: null,
                userJobs: [],
                userAllJobs: []
            }
        default:
            return state;
    }
}

const store = createStore(userReducer);

export default store;