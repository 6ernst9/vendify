export interface SessionCount {
    label: string;
    value: number;
}

export interface SessionCountResponse {
    hour: number;
    sessionCount: number;
}

export interface SessionRatioResponse {
    type: string;
    count: number;
}

export interface AvgSessionResponse {
    hour: number;
    avgMinutes: number;
}

export interface SessionRatio {
    data: SessionRatioResponse[];
    colors: [string, string];
}

export interface ProductAction {
    product: string;
    count: number;
}

export interface PagesVisit {
    page: string;
    hits: number;
}

export interface MostActiveUser {
    sessionCookie: string;
    userId: number;
    totalMinutes: number;
    favouritePage: string;
}

export interface ProductActionState {
    productId: number;
    name: string;
    count: number;
}

export interface AnalyticsState {
    sessionCount: SessionCount[];
    kpis: number[];
    sessionType: SessionRatio;
    avgSessions: AvgSessionResponse[];
    mostViewedProducts: ProductActionState[];
    mostCartedProducts: ProductActionState[];
    mostWishlistedProducts: ProductActionState[];
    mostVisitedPages: PagesVisit[];
    mostActiveUsers: MostActiveUser[];
}