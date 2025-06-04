import {loginFailure, loginSuccess, logout} from "./reducers";
import {getSessionState, LoginProps} from "./types";
import {continueSession, endSession, startSession} from "../../../redux/core/adminSession/reducers";
import {getAccountByUsername} from "../../admin-sign-up-widget/model/types";
import {ACCOUNTS_BASE_URL, AUTH_BASE_URL} from "../../../util/constants";
import {request} from "../../../util/request";
import {getOrCreateSessionId} from "../../../util/session";

export const login = async ({username, password, dispatch}: LoginProps) => {
    await request({
        url: AUTH_BASE_URL + '/login/0',
        method: 'POST',
        data: {placeholder: username, password},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-SESSION-ID': getOrCreateSessionId(),
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.login'
        }
    }).then((response) => {
        dispatch(loginSuccess(response.data));
        getAccount({
            username,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            dispatch})
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

export const getAccount = async({username, accessToken, refreshToken, dispatch} : getAccountByUsername) => {
    await request({
        url: ACCOUNTS_BASE_URL + '/get-user-by-username/0/' + username,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.get-user-by-username'
        }
    }).then((response) => {
        dispatch(startSession({
            ...response.data,
            accessToken,
            refreshToken
        }));
    }).catch((error) => {
        console.error(error);
    })
}

export const getSession = async({id ,dispatch} : getSessionState) => {
    await request({
        url: ACCOUNTS_BASE_URL,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaGSh23zOl21k4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.get-account'
        }
    }).then((response) => {
        dispatch(continueSession(response.data));
    }).catch((error) => {
        console.error(error);
    })
}