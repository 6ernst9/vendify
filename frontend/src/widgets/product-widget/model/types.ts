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
}

export interface GetProductById {
    productId: string;
    accessToken: string;
}