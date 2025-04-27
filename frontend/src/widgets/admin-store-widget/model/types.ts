import {StoreState} from "../../../redux/core/store/types";
import {Dispatch} from "redux";

export type Stores = {
    stores: StoreState[]
}

export type getStoresProps = {
    id: number,
    accessToken: string,
    dispatch: Dispatch;
}