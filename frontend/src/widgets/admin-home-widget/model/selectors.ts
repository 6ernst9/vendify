import {RootState} from "../../../redux/store";

export const adminHomeSelect = ({
    sessionCount: (state: RootState) => state.adminHome.sessionCount,
    totalSessions: (state: RootState) => state.adminHome.totalSessions,
    topProducts: (state: RootState) => state.adminHome.topSellingProduct,
    recentOrders: (state: RootState) => state.adminHome.recentOrders,
    quickKPIs: (state: RootState) => state.adminHome.quickKPIs,
});
