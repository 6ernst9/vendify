import {Dispatch} from "redux";
import {Product} from "../../../types/products";

export type Products = {
    news: Product[];
    sales: Product[];
    bestSelling: Product[];
    hasPreloaded: boolean;
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