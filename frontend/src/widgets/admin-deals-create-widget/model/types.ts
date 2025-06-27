export interface AddDeal {
    name: string;
    percentage: number;
    code?: string;
    category: string;
    endDate: string;
    productIds: number[];
    store: string;
    accessToken: string;
}

export interface Deal {
    id: number;
    name: string;
    code?: string;
    status: string;
    percentage: number;
    endDate: string;
    productIds: number[];
    store: string;
}