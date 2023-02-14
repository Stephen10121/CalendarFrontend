import { legacy_createStore as createStore } from "redux";
import { ActionTypes, SET_CLICK_GROUP, SET_ERROR, SET_JOB, SET_JOB_SELECT, SET_LOGOUT, SET_SELECTED, SET_USER_DATA, SET_USER_GROUPS, SET_USER_PENDING_GROUPS, SET_USER_TOKEN } from "./actions";
import { Store } from "./types";

const initialState = {
    token: null,
    userData: null,
    groups: [],
    pendingGroups: [],
    error: { show: false, message: "N/A" },
    selected: "home",
    clickGroup: null,
    jobs: [],
    jobSelected: null
} as Store;

function userReducer(state: Store = initialState, action: ActionTypes): Store {
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
        case SET_JOB:
            return {...state, jobs: action.payload}
        case SET_JOB_SELECT:
            return {...state, jobSelected: action.payload}
        case SET_LOGOUT:
            return { 
                token: null,
                userData: null,
                groups: [],
                pendingGroups: [],
                error: { show: false, message: "N/A" },
                selected: "home",
                clickGroup: null,
                jobs: [],
                jobSelected: null
            }
        default:
            return state;
    }
}

const store = createStore(userReducer);

export default store;