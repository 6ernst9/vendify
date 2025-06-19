import {ContactLinks, Theme} from "../../../redux/core/store/types";
import {Dispatch} from "redux";

export type Stores = {
    stores: StoreProp[]
}

export type getStoresProps = {
    id: number,
    accessToken: string,
    dispatch: Dispatch;
}

export type StoreProp = {
    id: string;
    owner: number;
    path: string;
    name: string;
    logo: string;
    banner: string;
    categories: string[];
    theme: Theme;
    contactLinks: ContactLinks;
    customers: number;
    orderNo: number;
    revenue: number;
}