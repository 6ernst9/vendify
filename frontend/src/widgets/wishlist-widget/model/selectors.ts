import {RootState} from "../../../redux/store";

export const userWishlistSelect = ({
    wishlist: (state: RootState) => state.userWishlist.wishlist
});
