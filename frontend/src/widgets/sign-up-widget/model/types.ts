import {Dispatch} from "redux";

export type RegisterProps = {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phoneNumber: string;
    store: string;
    dispatch: Dispatch;
}

export type getAccountByUsername = {
    username: string;
    accessToken: string;
    store: string;
    dispatch: Dispatch;
}