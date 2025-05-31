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

export interface WishlistDelProps {
    id: string;
    customerId: number;
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
    wishlist: WishlistProduct[];
}

export interface WishlistProduct {
    id: number;
    wishlistId: string;
    name: string;
    price: number;
    oldPrice?: number;
    stars: number;
    reviews: number;
    images: string[];
    sale: number;
}