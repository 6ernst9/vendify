import {Dispatch} from "redux";
import {Product} from "../../../types/products";

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
    dispatch: Dispatch;
}

export interface ProductState {
    product: Product;
    related: Product[];
    hasPreloaded: boolean;
}