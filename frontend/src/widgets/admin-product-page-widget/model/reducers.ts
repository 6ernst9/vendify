import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../../types/products";
import {defaultProduct} from "./defaultState";

const storeSlice = createSlice({
    name: 'adminProduct',
    initialState: defaultProduct,
    reducers: {
        setCurrentProduct: (state, action: PayloadAction<Product>) => {
            state.id = action.payload.id;
            state.description = action.payload.description;
            state.stock = action.payload.stock;
            state.name = action.payload.name;
            state.category = action.payload.category;
            state.reviews = action.payload.reviews;
            state.price = action.payload.price;
            state.oldPrice = action.payload.oldPrice;
            state.noReviews = action.payload.noReviews;
            state.images = action.payload.images;
            state.store = action.payload.store;
        }
    }
});

export const { setCurrentProduct } = storeSlice.actions;
export default storeSlice.reducer;