import {RootState} from "../../../redux/store";

export const adminAnalyticsSelect = ({
    sessionCount: (state: RootState) => state.adminAnalytics.sessionCount,
    quickKPIs: (state: RootState) => state.adminAnalytics.kpis,
    sessionType: (state: RootState) => state.adminAnalytics.sessionType,
    avgSessions: (state: RootState) => state.adminAnalytics.avgSessions,
    mostViewed: (state: RootState) => state.adminAnalytics.mostViewedProducts,
    mostCarted: (state: RootState) => state.adminAnalytics.mostCartedProducts,
    mostWishlisted: (state: RootState) => state.adminAnalytics.mostWishlistedProducts,
});
