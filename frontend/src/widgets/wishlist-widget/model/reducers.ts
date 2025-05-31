import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultWishlist} from "./defaultState";
import {WishlistProduct} from "./types";

const wishlistSlice = createSlice({
    name: 'userWishlistState',
    initialState: defaultWishlist,
    reducers: {
        setWishlistItems: (state, action: PayloadAction<WishlistProduct[]>) => {
            state.wishlist = action.payload;
        },
    }
});

export const { setWishlistItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;