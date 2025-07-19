import {loginFailure, loginSuccess, logout} from "./reducers";
import {endSession, startSession} from "../../../redux/core/adminSession/reducers";
import {ACCOUNTS_BASE_URL, AUTH_BASE_URL, COOKIE_KEY} from "../../../util/constants";
import {request} from "../../../util/request";
import {getOrCreateSessionId, updateActivity} from "../../../util/session";
import {Dispatch} from "redux";

export const login = async (email: string, password: string, dispatch: Dispatch) => {
    await request({
        url: AUTH_BASE_URL + '/login/0',
        method: 'POST',
        data: {placeholder: email, password},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-SESSION-ID': getOrCreateSessionId('0'),
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.login'
        }
    }).then((response) => {
        dispatch(loginSuccess(response.data));
        getAccount(email, response.data.accessToken, response.data.refreshToken, dispatch)
    }).catch((error) => {
        dispatch(loginFailure(error.response.data.message));
    })
}

export const logOut = async (storeId: string) => {
    const key = COOKIE_KEY + storeId;
    const sessionId = getOrCreateSessionId(storeId);

    await updateActivity('logout', 'logout', storeId);
    await request({
        url: AUTH_BASE_URL + '/logout/' + sessionId,
        method: 'POST',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.logout'
        }
    }).then((response) => {
        localStorage.removeItem(key);
        console.debug(response.data);
    }).catch((error) => {
        console.error(error);
    })
}

export const getAccount = async(email: string, accessToken: string, refreshToken: string, dispatch: Dispatch) => {
    await request({
        url: ACCOUNTS_BASE_URL + '/get-user-by-email/0/' + email,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.get-user-by-email'
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