import {Dispatch} from "redux";

export type getStoreProps = {
    id: string;
    accessToken: string;
    dispatch: Dispatch;
}