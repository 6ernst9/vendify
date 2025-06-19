export interface AddDeal {
    name: string;
    percentage: number;
    endDate: string;
    productIds: number[];
    store: string;
    accessToken: string;
}

export interface Deal {
    id: number;
    name: string;
    percentage: number;
    endDate: string;
    productIds: number[];
    store: string;
}