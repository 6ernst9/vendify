import {Dispatch} from "redux";

export type LoginProps = {
    store: string;
    username: string;
    password: string;
    dispatch: Dispatch;
}

export type AuthState = {
    logged: boolean;
    error: string | null;
}

export type getSessionState = {
    id: string;
    dispatch: Dispatch;
}

export type LoginResponse = {
    id: string;
    accessToken: string;
    refreshToken: string;
}

export type getAccountByUsername = {
    username: string;
    accessToken: string;
    store: string;
    dispatch: Dispatch;
}