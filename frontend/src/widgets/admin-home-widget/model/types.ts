import {TopSellingProducts} from "../../admin-finances-widget/model/types";
import {OrderResponse} from "../../admin-orders-widget/model/types";

export interface SessionCount {
    label: string;
    value: number;
}

export interface SessionCountResponse {
    hour: number;
    sessionCount: number;
}

export interface AdminHomeState {
    sessionCount: SessionCount[];
    totalSessions: number;
    topSellingProduct: TopSellingProducts[];
    recentOrders: OrderResponse[];
    quickKPIs: number[];
}