import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultOrder} from "./defaultState";
import {Order} from "./types";

const storeSlice = createSlice({
    name: 'userOrderState',
    initialState: defaultOrder,
    reducers: {
        setOrderItems: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
    }
});

export const { setOrderItems } = storeSlice.actions;
export default storeSlice.reducer;