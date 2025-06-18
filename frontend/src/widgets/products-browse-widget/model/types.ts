import {Dispatch} from "redux";
import {Product} from "../../../types/products";

export type Products = {
    products: Product[];
    hasPreloaded: boolean;
}

export type getProductsProps = {
    store: string;
    accessToken: string;
    dispatch: Dispatch;
}