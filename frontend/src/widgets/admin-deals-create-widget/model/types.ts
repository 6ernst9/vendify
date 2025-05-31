export interface AddDeal {
    name: string;
    percentage: number;
    endDate: string;
    productIds: number[];
    store: string;
    accessToken: string;
}