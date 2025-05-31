import {getAccountByUsername, getSessionState, LoginProps} from "./types";
import {endSession, startSession} from "../../../redux/core/session/reducers";
import {ACCOUNTS_BASE_URL, AUTH_BASE_URL} from "../../../util/constants";
import {request} from "../../../util/request";
import {loginFailure, loginSuccess, logout} from "../../admin-login-widget/model/reducers";

export const login = async ({username, password, store, dispatch}: LoginProps) => {
    await request({
        url: AUTH_BASE_URL + '/login/' + store,
        method: 'POST',
        data: {placeholder: username, password},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.login'
        }
    }).then((response) => {
        dispatch(loginSuccess(response.data));
        getAccount({username, accessToken: response.data.accessToken, store, dispatch})
    }).catch((error) => {
        dispatch(loginFailure(error.response.data.message));
    })
}

export const logOut = async ({id, dispatch}: getSessionState) => {
    await request({
        url: AUTH_BASE_URL + '/logout',
        method: 'POST',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.logout'
        }
    }).then((response) => {
        console.debug(response.data);
        dispatch(endSession());
        dispatch(logout());
    })
}

export const getAccount = async({username, accessToken, store, dispatch} : getAccountByUsername) => {
    await request({
        url: ACCOUNTS_BASE_URL + '/get-user-by-username/' + store + '/' + username,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.get-user-by-username'
        }
    }).then((response) => {
        dispatch(startSession(response.data));
    }).catch((error) => {
        console.error(error);
    })
}