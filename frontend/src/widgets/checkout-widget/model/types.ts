export interface PlaceOrder {
    customerId: number;
    storeId: string;
    price: number;
    address: Address;
    accessToken: string;
}

export interface Address {
    street: string;
    city: string;
    apartment?: string;
    phoneNumber: string;
    zipCode: string;
}