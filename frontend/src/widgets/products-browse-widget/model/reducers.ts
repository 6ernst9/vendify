import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultProducts} from "./defaultState";
import {Product} from "./types";

const productsSlice = createSlice({
    name: 'productsState',
    initialState: defaultProducts,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;