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
    rated: boolean;
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
    rated: boolean;
}

export interface OrderItem {
    quantity: number;
    productId: number;
}
