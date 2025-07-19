import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultState} from "./defaultState";
import {SessionCount} from "./types";
import {TopSellingProducts} from "../../admin-finances-widget/model/types";
import {OrderResponse} from "../../admin-orders-widget/model/types";

const adminHomeSlice = createSlice({
    name: 'adminHomeState',
    initialState: defaultState,
    reducers: {
        setSessionCount: (state, action: PayloadAction<SessionCount[]>) => {
            state.sessionCount = action.payload;
        },
        setTotalSessions: (state, action: PayloadAction<number>) => {
            state.totalSessions = action.payload;
        },
        setTopProducts: (state, action: PayloadAction<TopSellingProducts[]>) => {
            state.topSellingProduct = action.payload;
        },
        setRecentOrders: (state, action: PayloadAction<OrderResponse[]>) => {
            state.recentOrders = action.payload;
        },
        setQuickKPIs: (state, action: PayloadAction<number[]>) => {
            state.quickKPIs = action.payload;
        }
    }
});

export const { setSessionCount, setTotalSessions, setTopProducts, setRecentOrders, setQuickKPIs } = adminHomeSlice.actions;
export default adminHomeSlice.reducer;