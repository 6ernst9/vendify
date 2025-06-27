import {Address} from "../../checkout-widget/model/types";

export interface Order {
    id: string;
    customerId: number;
    items: OrderProduct[];
    address: Address;
    status: string;
    price: number;
    createdAt: string;
    storeId: string;
    store: string;
}

export interface OrderProduct {
    id: number
    name: string
    price: number
    quantity: number
    images: string[]
    stock: number
}