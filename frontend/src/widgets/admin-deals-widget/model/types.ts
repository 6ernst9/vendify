export interface Sale {
    id: number;
    name: string;
    code: string;
    percentage: number;
    store: string;
    endDate: string;
    productIds: number[];
    status: string;
}