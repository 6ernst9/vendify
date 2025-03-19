import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import './ProductSlider.css';
import {Product} from "../../types/products";
import WishlistProduct from "../WishlistProduct/WishlistProduct";

interface ProductProps {
    products: Product[];
    wishlist: boolean;
}

const ProductSlider: React.FC<ProductProps> = ({products, wishlist}) => {
    return (
        <div className="product-slider">
            {products.map((product) => {
                if(wishlist) {
                    return <WishlistProduct {...product}/>
                } else {
                    return <ProductCard {...product}/>
                }
            })}
        </div>
    )
}

export default ProductSlider;