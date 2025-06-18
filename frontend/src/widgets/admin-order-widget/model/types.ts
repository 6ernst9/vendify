import {Dispatch} from "redux";

export type getStoreProps = {
    id: string;
    accessToken: string;
    dispatch: Dispatch;
}


export type updateProps = {
    id: string;
    status: string;
    accessToken: string;
    dispatch: Dispatch;
}

export interface Order {
    id: string;
    customerId: number;
    items: OrderProduct[];
    status: string;
    price: number;
    createdAt: string;
    storeId: string;
    store: string;
}

export interface OrderProduct {
    id: number
    name: string
    price: number
    quantity: number
    images: string[]
    stock: number
}