import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultDeal} from "./defaultState";
import {Deal} from "../../admin-deals-create-widget/model/types";

const storeSlice = createSlice({
    name: 'adminDealState',
    initialState: defaultDeal,
    reducers: {
        setAdminDeal: (state, action: PayloadAction<Deal>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.code = action.payload.code;
            state.percentage = action.payload.percentage;
            state.productIds = action.payload.productIds;
            state.store = action.payload.store;
            state.endDate = action.payload.endDate;
            state.status = action.payload.status;
        }
    }
});

export const { setAdminDeal } = storeSlice.actions;
export default storeSlice.reducer;