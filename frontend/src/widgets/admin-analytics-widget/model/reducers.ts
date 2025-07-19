import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultState} from "./defaultState";
import {AvgSessionResponse, MostActiveUser, PagesVisit, ProductActionState, SessionCount, SessionRatio} from "./types";

const adminHomeSlice = createSlice({
    name: 'adminAnalyticsState',
    initialState: defaultState,
    reducers: {
        setSessionCount: (state, action: PayloadAction<SessionCount[]>) => {
            state.sessionCount = action.payload;
        },
        setQuickKPIs: (state, action: PayloadAction<number[]>) => {
            state.kpis = action.payload;
        },
        setSessionType: (state, action: PayloadAction<SessionRatio>) => {
            state.sessionType = action.payload;
        },
        setAvgSession: (state, action: PayloadAction<AvgSessionResponse[]>) => {
            state.avgSessions = action.payload;
        },
        setMostViewedProducts: (state, action: PayloadAction<ProductActionState[]>) => {
            state.mostViewedProducts = action.payload;
        },
        setMostCartedProducts: (state, action: PayloadAction<ProductActionState[]>) => {
            state.mostCartedProducts = action.payload;
        },
        setMostWishlistedProducts: (state, action: PayloadAction<ProductActionState[]>) => {
            state.mostWishlistedProducts = action.payload;
        },
        setMostVisitedPages: (state, action: PayloadAction<PagesVisit[]>) => {
            state.mostVisitedPages = action.payload;
        },
        setMostActiveUsers: (state, action: PayloadAction<MostActiveUser[]>) => {
            state.mostActiveUsers = action.payload;
        }
    }
});

export const { setSessionCount, setQuickKPIs, setSessionType, setAvgSession, setMostWishlistedProducts, setMostViewedProducts, setMostCartedProducts, setMostVisitedPages, setMostActiveUsers } = adminHomeSlice.actions;
export default adminHomeSlice.reducer;