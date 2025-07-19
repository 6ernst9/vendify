import {startSession} from "../../../redux/core/session/reducers";
import {registrationFailure, registrationSuccess} from "../../admin-login-widget/model/reducers";
import {request} from "../../../util/request";
import {ACCOUNTS_BASE_URL, AUTH_BASE_URL} from "../../../util/constants";
import {getOrCreateSessionId, updateActivity} from "../../../util/session";
import {Dispatch} from "redux";

export const register = async (email: string, password: string, firstName: string, lastName: string, store: string, phoneNumber: string, dispatch: Dispatch) => {
    await updateActivity("sign-up","sign-up", store);
    await request({
        url: AUTH_BASE_URL + '/register',
        method: 'POST',
        data: {email, firstName, lastName, phoneNumber, password, storeId: store},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-SESSION-ID': getOrCreateSessionId(store),
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.register'
        }
    }).then((response) => {
        dispatch(registrationSuccess(response.data));
        getAccount(email, response.data.accessToken, response.data.refreshToken, store, dispatch);
    }).catch((error) => {
        dispatch(registrationFailure(error.response.data.message));
    })
}

export const getAccount = async(email: string, accessToken: string, refreshToken: string, store: string, dispatch: Dispatch) => {
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