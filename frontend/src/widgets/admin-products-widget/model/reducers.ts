import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultProducts} from "./defaultState";
import {Product} from "./types";

const productsSlice = createSlice({
    name: 'userProductsState',
    initialState: defaultProducts,
    reducers: {
        setAdminProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    }
});

export const { setAdminProducts } = productsSlice.actions;
export default productsSlice.reducer;