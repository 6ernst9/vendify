import {AnalyticsState} from "./types";

export const defaultState: AnalyticsState = {
    sessionCount: [],
    kpis: [],
    avgSessions: [],
    sessionType: {
        data: [],
        colors: ['', '']
    },
    mostViewedProducts: [],
    mostCartedProducts: [],
    mostWishlistedProducts: []
}