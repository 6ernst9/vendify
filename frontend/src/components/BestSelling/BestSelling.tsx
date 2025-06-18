import React from "react";
import './BestSelling.css'
import ProductSlider from "../ProductSlider/ProductSlider";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {homeProductsSelect} from "../../widgets/home-widget/model/selectors";
import BestSellingSkeleton from "./BestSellingSkeleton";

const BestSelling: React.FC = () => {
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);
    const products = useSelector(homeProductsSelect.bestSelling);
    const hasPreloaded = useSelector(homeProductsSelect.hasPreloaded);

    if(!hasPreloaded) {
        return <BestSellingSkeleton/>
    }

    if(products.length === 0) {
        return null;
    }

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