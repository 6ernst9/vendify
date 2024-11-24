import React from "react";
import './BestSelling.css'
import ProductCard from "../ProductCard/ProductCard";
import {products} from "../../widgets/home-widget/mock/products";

const BestSelling: React.FC = () => {
    return (
        <div className="best-selling">
            <div className="best-selling-header">
                <span/>
                <p>This Month</p>
            </div>
            <div className="best-selling-title">
                <h2>Best Selling Products</h2>
                <div className="best-selling-title-button">
                    <p>View All</p>
                </div>
            </div>
            <div className="best-selling-products">
                {products.map((product) =>
                    <ProductCard {...product}/>
                )}
            </div>
        </div>
    )
}

export default BestSelling;