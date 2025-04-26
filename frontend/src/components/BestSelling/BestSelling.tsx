import React from "react";
import './BestSelling.css'
import {products} from "../../widgets/home-widget/mock/products";
import ProductSlider from "../ProductSlider/ProductSlider";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

const BestSelling: React.FC = () => {
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);

    return (
        <div className="best-selling">
            <div className="best-selling-header">
                <span/>
                <p>This Month</p>
            </div>
            <div className="best-selling-title">
                <h2>Best Selling Products</h2>
                <div className="best-selling-title-button" onClick={() => navigate(`/${store}/browse`)}>
                    <p>View All</p>
                </div>
            </div>
            <ProductSlider products={products} wishlist={false}/>
        </div>
    )
}

export default BestSelling;