import {Dispatch} from "redux";

export interface Product {
    id: number;
    name: string;
    images: string[];
    sale: number;
    price: number;
    oldPrice: number;
    reviews: number;
    stars: number;
}

export type Products = {
    news: Product[];
    sales: Product[];
    bestSelling: Product[];
}

export type getProductsProps = {
    storeId: string;
    accessToken: string;
    dispatch: Dispatch;
}

export type getProductProps = {
    id: number;
    accessToken: string;
}