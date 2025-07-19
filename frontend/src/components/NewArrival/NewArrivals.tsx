import React from "react";
import "./NewArrivals.css";
import ProductSlider from "../ProductSlider/ProductSlider";
import {useSelector} from "react-redux";
import {homeProductsSelect} from "../../widgets/home-widget/model/selectors";

const NewArrivals: React.FC = () => {
    const products = useSelector(homeProductsSelect.newProducts);

    if(products.length === 0) {
        return null;
    }

    return (
        <div className="new-arrivals">
            <div className="new-arrivals-header">
                <span/>
                <p>Featured</p>
            </div>
            <div className="new-arrivals-title">
                <h2>New Arrivals</h2>
            </div>
            <ProductSlider products={products} wishlist={false}/>
        </div>
    )
}

export default NewArrivals;