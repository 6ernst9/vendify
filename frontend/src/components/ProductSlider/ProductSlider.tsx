import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import './ProductSlider.css';
import {Product} from "../../types/products";

interface ProductProps {
    products: Product[];
}

const ProductSlider: React.FC<ProductProps> = ({products}) => {
    return (
        <div className="product-slider">
            {products.map((product) =>
                <ProductCard {...product}/>
            )}
        </div>
    )
}

export default ProductSlider;