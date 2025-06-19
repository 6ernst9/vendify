import {Dispatch} from "redux";
import {Address} from "../../checkout-widget/model/types";

export interface AdminOrders {
    orders: Order[];
}

export interface Order {
    id: string;
    customerId: number;
    items: OrderItem[];
    address: Address;
    img: string;
    status: string;
    price: number;
    createdAt: string;
}

export interface OrderResponse {
    id: string;
    customerId: number;
    items: OrderItem[];
    price: number;
    address: Address;
    storeId: string;
    status: string;
    createdAt: string;
}

export interface GetAccount {
    customerId: number;
    accessToken: string;
}

export interface OrderItem {
    quantity: number;
    productId: number;
}

export interface GetOrders {
    id: number;
    storeId: string;
    accessToken: string;
    dispatch: Dispatch;
}