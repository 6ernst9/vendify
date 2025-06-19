import {Dispatch} from "redux";

export type LoginProps = {
    email: string;
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