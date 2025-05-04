import {Dispatch} from "redux";

export type ProductProps = {
    store: string;
    name: string;
    images: string[];
    category: string;
    sizes: string[];
    price: number;
    description: string;
    stock: number;
    accessToken: string;
    dispatch: Dispatch;
}