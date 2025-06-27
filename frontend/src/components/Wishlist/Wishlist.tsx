import React from "react";
import './Wishlist.css';
import ProductSlider from "../ProductSlider/ProductSlider";
import {useDispatch, useSelector} from "react-redux";
import {userWishlistSelect} from "../../widgets/wishlist-widget/model/selectors";
import {storeSelect} from "../../redux/core/store/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {promoteWishlist} from "../../widgets/wishlist-widget/model/effects";
import WishlistSkeleton from "./WishlistSkeleton";
import {useNavigate} from "react-router-dom";

const Wishlist: React.FC = () => {
    const wishlist = useSelector(userWishlistSelect.wishlist);
    const accessToken = useSelector(sessionSelect.accessToken);
    const customerId = useSelector(sessionSelect.id);
    const storeId = useSelector(storeSelect.id);
    const hasPreloaded = useSelector(userWishlistSelect.hasPreloaded);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);

    const moveToBag = () => {
        promoteWishlist(storeId, customerId, accessToken, dispatch);
    }

    if(!hasPreloaded) {
        return <WishlistSkeleton/>
    }

    return (
        <div className="wishlist">
            <div className="wishlist-header">
                <h2 className="wishlist-category">Home / Wishlist {wishlist.length > 0 ? `(${wishlist.length})` : ''}</h2>
                {wishlist.length > 0 && (<div className="wishlist-button" onClick={moveToBag}>
                    <h3>Move All To Cart</h3>
                </div>)}
            </div>
            {wishlist.length === 0 ? (
                <div className="wishlist-empty-message">
                    <h2>Your wishlist is currently empty</h2>
                    <p>Browse our products and add items to your wishlist to see them here.</p>
                    <button onClick={() => navigate(`/${store}/browse`)} className="browse-btn">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="wishlist-products">
                    <ProductSlider products={wishlist} wishlist={true}/>
                </div>
                )}
        </div>
    )
}

export default Wishlist;