import {RootState} from "../../../redux/store";
import {createSelector} from "@reduxjs/toolkit";

export const cartSelect = ({
    cartItems: (state: RootState) => state.cart.cartItems,
    totalQuantity: createSelector(
        (state: RootState) => state.cart.cartItems,
        (items) => items.reduce((total, item) => total + item.quantity, 0)
    )
});
