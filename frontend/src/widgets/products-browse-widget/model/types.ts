import {Dispatch} from "redux";

export type Product = {
    id: number;
    store: string;
    name: string;
    images: string[];
    category: string;
    sizes: string;
    price: number;
    description: string;
    reviews: number;
    stock: number;
}

export type Products = {
    products: Product[];
}

export type getProductsProps = {
    store: string;
    accessToken: string;
    dispatch: Dispatch;
}