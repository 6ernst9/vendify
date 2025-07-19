export interface AdminOrders {
    orders: Order[];
}

export interface Order {
    id: string;
    customer: string;
    items: OrderItem[];
    status: string;
    price: number;
    storeId: string;
    createdAt: string;
}

export interface OrderResponse {
    id: string;
    customerId: number;
    items: OrderItem[];
    storeId: string;
    price: number;
    status: string;
    createdAt: string;
}

export interface OrderItem {
    quantity: number;
    productId: number;
}