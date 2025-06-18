import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultProducts} from "./defaultState";
import {Product} from "../../../types/products";

const productsSlice = createSlice({
    name: 'productsState',
    initialState: defaultProducts,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.hasPreloaded = true;
        },
        setPreloaded: (state, action: PayloadAction<boolean>) => {
            state.hasPreloaded = action.payload;
        }
    }
});

export const { setProducts, setPreloaded } = productsSlice.actions;
export default productsSlice.reducer;