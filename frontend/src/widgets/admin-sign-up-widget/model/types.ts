import {Dispatch} from "redux";

export type RegisterProps = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    dispatch: Dispatch;
}

export type getAccountByEmail = {
    email: string;
    accessToken: string;
    refreshToken: string;
    dispatch: Dispatch;
}