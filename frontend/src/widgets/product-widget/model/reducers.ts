import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultState} from "./defaultState";
import {Product} from "../../../types/products";

const currentProductSlice = createSlice({
    name: 'currentProductState',
    initialState: defaultState,
    reducers: {
        setRelatedItems: (state, action: PayloadAction<Product[]>) => {
            state.related = action.payload;
            state.hasPreloaded = true;
        },
        setProduct: (state, action: PayloadAction<Product>) => {
            state.product = action.payload;
        },
    }
});

export const { setRelatedItems, setProduct } = currentProductSlice.actions;
export default currentProductSlice.reducer;