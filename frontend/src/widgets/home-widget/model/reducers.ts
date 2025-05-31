import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultProducts} from "./defaultState";
import {Product} from "./types";

const homeProductsSlice = createSlice({
    name: 'homeProductsState',
    initialState: defaultProducts,
    reducers: {
        setBestSellingProducts: (state, action: PayloadAction<Product[]>) => {
            state.bestSelling = action.payload;
        },
        setNewProducts: (state, action: PayloadAction<Product[]>) => {
            state.news = action.payload;
        },
        setSaleProducts: (state, action: PayloadAction<Product[]>) => {
            state.sales = action.payload;
        },
    }
});

export const { setNewProducts, setSaleProducts, setBestSellingProducts } = homeProductsSlice.actions;
export default homeProductsSlice.reducer;