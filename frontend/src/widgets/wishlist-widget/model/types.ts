import {Dispatch} from "redux";
import {Product} from "../../../types/products";

export interface GetCart {
    storeId: string;
    customerId: number;
    accessToken: string;
    dispatch: Dispatch;
}

export interface GetProduct {
    productId: number;
    accessToken: string;
}

export interface WishlistDelProps {
    storeId: string;
    customerId: number;
    productId: number;
    accessToken: string;
    dispatch: Dispatch;
}

export interface WishlistItemResponse {
    id: string;
    storeId: string;
    productId: number;
    customerId: number;
}

export interface WishlistType {
    wishlist: Product[];
}