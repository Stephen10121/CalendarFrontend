import { GoogleLoginData } from "../functions/backendFetch";

export const SET_USER_DATA = "SET_USER_DATA";
export const SET_USER_TOKEN = "SET_USER_TOKEN";

export const setUserToken = (token: string) => (dispatch: any) => {
    dispatch({
        type: SET_USER_TOKEN,
        payload: token
    });
}

export const setUserData = (data: GoogleLoginData) => (dispatch: any) => {
    dispatch({
        type: SET_USER_DATA,
        payload: data
    });
}