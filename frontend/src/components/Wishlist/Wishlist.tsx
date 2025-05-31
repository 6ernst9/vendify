import React from "react";
import './Wishlist.css';
import ProductSlider from "../ProductSlider/ProductSlider";
import {useSelector} from "react-redux";
import {userWishlistSelect} from "../../widgets/wishlist-widget/model/selectors";

const Wishlist: React.FC = () => {
    const wishlist = useSelector(userWishlistSelect.wishlist);
    return (
        <div className="wishlist">
            <div className="wishlist-header">
                <h2 className="wishlist-category">Home / Wishlist ({wishlist.length})</h2>
                <div className="wishlist-button">
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