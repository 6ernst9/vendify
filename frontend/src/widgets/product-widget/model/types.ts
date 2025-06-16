import {Dispatch} from "redux";

export interface AddToCart {
    quantity: number;
    customerId: number;
    productId: number;
    storeId: string;
    dispatch: Dispatch;
    accessToken: string;
}

export interface AddToWishlist {
    customerId: number;
    productId: number;
    storeId: string;
    accessToken: string;
    dispatch: Dispatch;
}

export interface GetProductById {
    storeId: string;
    productId: string;
    accessToken: string;
}