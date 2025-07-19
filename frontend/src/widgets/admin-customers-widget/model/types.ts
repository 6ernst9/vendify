export type User = {
    id: string,
    firstName:string;
    lastName:string;
    email: string;
    phoneNumber: string,
    store: string;
    lastLogged: string;
}

export type UserResponse = {
    id: string,
    firstName:string;
    lastName:string;
    email: string;
    phoneNumber: string,
}

export type AdminCustomers = {
    customers: User[];
}