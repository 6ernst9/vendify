import {getAccountByEmail, RegisterProps} from "./types";
import {startSession} from "../../../redux/core/adminSession/reducers";
import {registrationFailure, registrationSuccess} from "../../admin-login-widget/model/reducers";
import {request} from "../../../util/request";
import {ACCOUNTS_BASE_URL, AUTH_BASE_URL} from "../../../util/constants";
import {getOrCreateSessionId} from "../../../util/session";

export const register = async ({email, password, firstName, lastName, phoneNumber, dispatch }: RegisterProps) => {
    await request({
        url: AUTH_BASE_URL + '/register',
        method: 'POST',
        data: {email, firstName, lastName, phoneNumber, password, storeId: 0},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-SESSION-ID': getOrCreateSessionId('0'),
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.register'
        }
    }).then((response) => {
        dispatch(registrationSuccess(response.data));
        getAccount({
                email,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                dispatch
            });
    }).catch((error) => {
        dispatch(registrationFailure(error.response.data.message));
    })
}

export const getAccount = async({email, accessToken, refreshToken, dispatch} : getAccountByEmail) => {
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