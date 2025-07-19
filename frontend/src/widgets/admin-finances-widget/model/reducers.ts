import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultState} from "./defaultState";
import {
    AverageOrderValue, CustomerOrders, CustomerRatio, CustomerRevenue,
    OrdersPerDay,
    ProductPerformance,
    ProductRevenue,
    RevenuePerDay,
    TopSellingProducts
} from "./types";

const adminHomeSlice = createSlice({
    name: 'adminFinancesState',
    initialState: defaultState,
    reducers: {
        setQuickKPIs: (state, action: PayloadAction<number[]>) => {
            state.kpis = action.payload;
        },
        setOrdersPerDay: (state, action: PayloadAction<OrdersPerDay[]>) => {
            state.ordersPerDay = action.payload;
        },
        setRevenuePerDay: (state, action: PayloadAction<RevenuePerDay[]>) => {
            state.revenuePerDay = action.payload;
        },
        setAverageOrderTrend: (state, action: PayloadAction<AverageOrderValue[]>) => {
            state.averageOrderValue = action.payload;
        },
        setTopSellingProducts: (state, action: PayloadAction<TopSellingProducts[]>) => {
            state.topSellingProduct = action.payload;
        },
        setProductRevenue: (state, action: PayloadAction<ProductRevenue[]>) => {
            state.productRevenue = action.payload;
        },
        setProductPerformance: (state, action: PayloadAction<ProductPerformance[]>) => {
            state.productPerformance = action.payload;
        },
        setCustomerRatio: (state, action: PayloadAction<CustomerRatio[]>) => {
            state.customerRatio = action.payload;
        },
        setCustomerOrders: (state, action: PayloadAction<CustomerOrders[]>) => {
            state.customerOrders = action.payload;
        },
        setCustomerRevenue: (state, action: PayloadAction<CustomerRevenue[]>) => {
            state.customerRevenue = action.payload;
        },
    }
});

export const { setQuickKPIs, setRevenuePerDay, setOrdersPerDay, setAverageOrderTrend, setProductPerformance, setProductRevenue, setTopSellingProducts, setCustomerRevenue, setCustomerRatio, setCustomerOrders } = adminHomeSlice.actions;
export default adminHomeSlice.reducer;