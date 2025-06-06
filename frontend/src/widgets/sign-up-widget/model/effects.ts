import {getAccountByUsername, RegisterProps} from "./types";
import {startSession} from "../../../redux/core/session/reducers";
import {registrationFailure, registrationSuccess} from "../../admin-login-widget/model/reducers";
import {request} from "../../../util/request";
import {ACCOUNTS_BASE_URL, AUTH_BASE_URL} from "../../../util/constants";
import {getOrCreateSessionId, updateActivity} from "../../../util/session";

export const register = async ({email, username, password, firstName, lastName, store, phoneNumber, dispatch }: RegisterProps) => {
    await updateActivity("sign-up","sign-up", store);
    await request({
        url: AUTH_BASE_URL + '/register',
        method: 'POST',
        data: {email, firstName, lastName, phoneNumber, username, password, storeId: store},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-SESSION-ID': getOrCreateSessionId(),
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.register'
        }
    }).then((response) => {
        dispatch(registrationSuccess(response.data));
        getAccount({username, accessToken: response.data.accessToken, store, dispatch});
    }).catch((error) => {
        dispatch(registrationFailure(error.response.data.message));
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