import {getAccountByUsername, RegisterProps} from "./types";
import {startSession} from "../../../redux/core/session/reducers";
import {registrationFailure, registrationSuccess} from "../../admin-login-widget/model/reducers";
import {request} from "../../../util/request";
import {ACCOUNTS_BASE_URL} from "../../../util/constants";

export const register = async ({email, username, password, firstName, lastName, phoneNumber, dispatch }: RegisterProps) => {
    await request({
        url: ACCOUNTS_BASE_URL + + '/auth/register/0',
        method: 'POST',
        data: {email, firstName, lastName, phoneNumber, username, password},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'auth.register'
        }
    }).then((response) => {
        dispatch(registrationSuccess(response.data));
        getAccount({username, dispatch});
    }).catch((error) => {
        dispatch(registrationFailure(error.response.data.message));
    })
}

export const getAccount = async({username ,dispatch} : getAccountByUsername) => {
    await request({
        url: ACCOUNTS_BASE_URL + '/account/get-user-by-username/0/' + username,
        method: 'GET',
    }).then((response) => {
        dispatch(startSession(response.data));
    }).catch((error) => {
        console.error(error);
    })
}