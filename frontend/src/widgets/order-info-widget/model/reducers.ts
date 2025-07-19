import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultOrder} from "./defaultState";
import {Order} from "./types";

const orderSlice = createSlice({
    name: 'userOrder',
    initialState: defaultOrder,
    reducers: {
        setCurrentOrder: (state, action: PayloadAction<Order>) => {
            state.id = action.payload.id;
            state.customerId = action.payload.customerId;
            state.items = action.payload.items;
            state.price = action.payload.price;
            state.status = action.payload.status;
            state.address = action.payload.address;
            state.storeId = action.payload.storeId;
            state.createdAt =action.payload.createdAt;
            state.rated =action.payload.rated;
        }
    }
});

export const { setCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;