import {RootState} from "../../../redux/store";

export const adminFinancesSelect = ({
    quickKPIs: (state: RootState) => state.adminFinances.kpis,
    revenuePerDay: (state: RootState) => state.adminFinances.revenuePerDay,
    ordersPerDay: (state: RootState) => state.adminFinances.ordersPerDay,
    averageOrder: (state: RootState) => state.adminFinances.averageOrderValue,
    productPerformance: (state: RootState) => state.adminFinances.productPerformance,
    topSellingProducts: (state: RootState) => state.adminFinances.topSellingProduct,
    productRevenue: (state: RootState) => state.adminFinances.productRevenue,
    customerRatio: (state: RootState) => state.adminFinances.customerRatio,
    customerOrders: (state: RootState) => state.adminFinances.customerOrders,
    customerRevenue: (state: RootState) => state.adminFinances.customerRevenue,
});
