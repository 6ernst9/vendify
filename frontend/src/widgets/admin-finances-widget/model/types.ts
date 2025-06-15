export interface FinancesState {
    kpis: number[];
    revenuePerDay: RevenuePerDay[];
    ordersPerDay: OrdersPerDay[];
    averageOrderValue: AverageOrderValue[];
    topSellingProduct: TopSellingProducts[];
    productRevenue: ProductRevenue[];
    productPerformance: ProductPerformance[];
}

export interface RevenuePerDay {
    day: string;
    revenue: number;
}

export interface OrdersPerDay {
    day: string;
    orders: number;
}

export interface AverageOrderValue {
    day: string;
    averageOrderValue: number;
}

export type ProductViewsMetrics = {
    product: number;
    count: number;
};

export type TopSellingProducts = {
    productId: number;
    totalSold: number;
};

export type ProductRevenue = {
    productId: number;
    revenue: number;
};

export type ProductSalesMetrics = {
    productId: number;
    totalSold: number;
    revenue: number;
};

export type ProductPerformance = {
    productId: number;
    views: number;
    totalSold: number;
    revenue: number;
    conversionRate: number;
};
