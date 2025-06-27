export interface CartItem {
    id: string;
    storeId: string;
    quantity: number;
    productId: number;
    customerId: number;
}

export interface CartType {
    cartItems: Cart[];
}

export interface Cart {
    id: string;
    img: string;
    name: string;
    price: number;
    quantity: number;
    productId: number;
}