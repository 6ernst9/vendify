import {Dispatch} from "redux";

export interface AdminOrders {
    orders: Order[];
}

export interface Order {
    id: string;
    customer: string;
    items: OrderItem[];
    status: string;
    price: number;
    createdAt: string;
}

export interface OrderResponse {
    id: string;
    customerId: number;
    items: OrderItem[];
    price: number;
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