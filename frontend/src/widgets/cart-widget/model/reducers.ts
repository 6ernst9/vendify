import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultCart} from "./defaultState";
import {Cart} from "./types";

const storeSlice = createSlice({
    name: 'cartState',
    initialState: defaultCart,
    reducers: {
        setCartItems: (state, action: PayloadAction<Cart[]>) => {
            state.cartItems = action.payload;
        },
    }
});

export const { setCartItems } = storeSlice.actions;
export default storeSlice.reducer;