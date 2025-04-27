import {Dispatch} from "redux";

export type getStoreProps = {
    path: string;
    accessToken: string;
    dispatch: Dispatch;
}