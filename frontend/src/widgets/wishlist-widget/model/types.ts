import {Product} from "../../../types/products";

export interface WishlistItemResponse {
    id: string;
    storeId: string;
    productId: number;
    customerId: number;
}

export interface WishlistType {
    wishlist: Product[];
    hasPreloaded: boolean;
}