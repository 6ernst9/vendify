import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultProducts} from "./defaultState";
import {Product} from "../../../types/products";
import {Sales} from "./types";

const homeProductsSlice = createSlice({
    name: 'homeProductsState',
    initialState: defaultProducts,
    reducers: {
        setBestSellingProducts: (state, action: PayloadAction<Product[]>) => {
            state.bestSelling = action.payload;
            state.hasPreloaded = true;
        },
        setNewProducts: (state, action: PayloadAction<Product[]>) => {
            state.news = action.payload;
        },
        setSaleProducts: (state, action: PayloadAction<Sales>) => {
            state.sales = action.payload;
        },
    }
});

export const { setNewProducts, setSaleProducts, setBestSellingProducts } = homeProductsSlice.actions;
export default homeProductsSlice.reducer;