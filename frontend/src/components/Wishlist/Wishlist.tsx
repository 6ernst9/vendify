import React from "react";
import './Wishlist.css';
import ProductSlider from "../ProductSlider/ProductSlider";
import {useDispatch, useSelector} from "react-redux";
import {userWishlistSelect} from "../../widgets/wishlist-widget/model/selectors";
import {storeSelect} from "../../redux/core/store/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {promoteWishlist} from "../../widgets/wishlist-widget/model/effects";
import WishlistSkeleton from "./WishlistSkeleton";

const Wishlist: React.FC = () => {
    const wishlist = useSelector(userWishlistSelect.wishlist);
    const accessToken = useSelector(sessionSelect.accessToken);
    const customerId = useSelector(sessionSelect.id);
    const exists = useSelector(sessionSelect.exists);
    const storeId = useSelector(storeSelect.id);
    const hasPreloaded = useSelector(userWishlistSelect.hasPreloaded);
    const dispatch = useDispatch();

    const moveToBag = () => {
        if(exists) {
            promoteWishlist({storeId, customerId, accessToken, dispatch});
        }
    }

    if(!hasPreloaded) {
        return <WishlistSkeleton/>
    }

    return (
        <div className="wishlist">
            <div className="wishlist-header">
                <h2 className="wishlist-category">Home / Wishlist ({wishlist.length})</h2>
                <div className="wishlist-button" onClick={moveToBag}>
                    <h3>Move All To Cart</h3>
                </div>
            </div>
            <div className="wishlist-products">
                <ProductSlider products={wishlist} wishlist={true}/>
            </div>
        </div>
    )
}

export default Wishlist;