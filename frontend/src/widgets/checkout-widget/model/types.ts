export interface Address {
    street: string;
    city: string;
    apartment?: string;
    phoneNumber: string;
    zipCode: string;
}

export interface GetCoupon {
    code: string;
    storeId: string;
    accessToken: string;
}