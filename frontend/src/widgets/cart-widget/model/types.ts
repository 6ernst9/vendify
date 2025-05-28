import {Dispatch} from "redux";

export interface GetCart {
    customerId: number;
    accessToken: string;
    dispatch: Dispatch;
}

export interface GetProduct {
    productId: number;
    accessToken: string;
}

export interface CartItem {
    id: string;
    storeId: string;
    quantity: number;
    productId: number;
    customerId: number;
}

export interface CartType {
    cartItems: Cart[];
}

export interface Cart {
    id: string;
    img: string;
    name: string;
    price: number;
    quantity: number;
    productId: number;
}