import {AnalyticsState} from "./types";

export const defaultState: AnalyticsState = {
    sessionCount: [],
    kpis: [0, 0, 0, 0],
    avgSessions: [],
    sessionType: {
        data: [],
        colors: ['', '']
    },
    mostViewedProducts: [],
    mostCartedProducts: [],
    mostWishlistedProducts: [],
    mostActiveUsers: [],
    mostVisitedPages: []
}