import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultDeal} from "./defaultState";
import {Deal} from "../../admin-deals-create-widget/model/types";

const storeSlice = createSlice({
    name: 'userDealsState',
    initialState: defaultDeal,
    reducers: {
        setUserDeals: (state, action: PayloadAction<Deal[]>) => {
            state.sales = action.payload;
        }
    }
});

export const { setUserDeals } = storeSlice.actions;
export default storeSlice.reducer;