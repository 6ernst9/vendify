import React from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import {products} from "../../widgets/wishlist-widget/mock/products";
import './WishlistProducts.css';

const WishlistProducts: React.FC = () => {
    return (
        <div className="wishlist-products">
            <ProductSlider products={products} wishlist={true}/>
        </div>
    )
}

export default WishlistProducts;