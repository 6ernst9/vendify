import {getSessionState, LoginProps} from "./types";
import {endSession, startSession} from "../../../redux/core/session/reducers";
import {ACCOUNTS_BASE_URL, AUTH_BASE_URL} from "../../../util/constants";
import {request} from "../../../util/request";
import {loginFailure, loginSuccess, logout} from "../../admin-login-widget/model/reducers";
import {getOrCreateSessionId, updateActivity} from "../../../util/session";
import {getAccountByEmail} from "../../sign-up-widget/model/types";

export const login = async ({email, password, store, dispatch}: LoginProps) => {
    await updateActivity("login", "login", store);
    await request({
        url: AUTH_BASE_URL + '/login/' + store,
        method: 'POST',
        data: {placeholder: email, password},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-SESSION-ID': getOrCreateSessionId(store),
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.login'
        }
    }).then((response) => {
        dispatch(loginSuccess(response.data));
        getAccount({email: email, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken, store, dispatch})
    }).catch((error) => {
        dispatch(loginFailure(error.response.data.message));
    })
}

export const logOut = async ({id, dispatch}: getSessionState) => {
    //await updateActivity("logout", );
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

    export const getAccount = async({email, accessToken, refreshToken, store, dispatch} : getAccountByEmail) => {
    await request({
        url: ACCOUNTS_BASE_URL + '/get-user-by-email/' + store + '/' + email,
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