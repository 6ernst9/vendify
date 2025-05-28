import {RootState} from "../../../redux/store";

export const cartSelect = ({
    cartItems: (state: RootState) => state.cart.cartItems
});
