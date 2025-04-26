import React from "react";
import './Sales.css';
import {products} from "../../widgets/home-widget/mock/products";
import ProductSlider from "../ProductSlider/ProductSlider";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useNavigate} from "react-router-dom";
import {storeSelect} from "../../redux/core/store/selectors";

const Sales: React.FC = () => {
    const store = useSelector(storeSelect.path);
    const navigate = useNavigate();

    return (
        <div className="sales">
            <div className="sales-header">
                <span/>
                <p>Today's</p>
            </div>
            <div className="sales-title">
                <h2>Flash Sales</h2>
                <div className="sales-title-timer">
                    <div className="sales-title-timer-container">
                        <p>Days</p>
                        <h3>03</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Hours</p>
                        <h3>23</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Minutes</p>
                        <h3>19</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Seconds</p>
                        <h3>56</h3>
                    </div>
                </div>
                <div className="sales-title-button" onClick={() => navigate(`/${store}/browse`)}>
                    <p>View All Products</p>
                </div>
            </div>
            <ProductSlider products={products} wishlist={false}/>
        </div>
    )
}

export default Sales;