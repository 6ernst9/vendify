export type UserSession = {
    accessToken: string;
    refreshToken: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    storeId: string;
}

export type User = {
    id: string,
    firstName:string;
    lastName:string;
    email: string
    phoneNumber: string
    storeId: string;
}