import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultWishlist} from "./defaultState";
import {Product} from "../../../types/products";

const wishlistSlice = createSlice({
    name: 'userWishlistState',
    initialState: defaultWishlist,
    reducers: {
        setWishlistItems: (state, action: PayloadAction<Product[]>) => {
            state.wishlist = action.payload;
            state.hasPreloaded = true;
        },
    }
});

export const { setWishlistItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;