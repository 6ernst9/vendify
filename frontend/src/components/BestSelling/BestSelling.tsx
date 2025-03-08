import React from "react";
import './BestSelling.css'
import {products} from "../../widgets/home-widget/mock/products";
import ProductSlider from "../ProductSlider/ProductSlider";

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
            <ProductSlider products={products}/>
        </div>
    )
}

export default BestSelling;