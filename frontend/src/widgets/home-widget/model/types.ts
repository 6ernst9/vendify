import {Dispatch} from "redux";
import {Product} from "../../../types/products";
import {Deal} from "../../admin-deals-create-widget/model/types";

export type Products = {
    news: Product[];
    sales: Sales;
    bestSelling: Product[];
    hasPreloaded: boolean;
}

export type Sales = {
    products: Product[];
    sale: Deal;
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