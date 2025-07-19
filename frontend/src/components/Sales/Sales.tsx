import React, {useEffect, useState} from "react";
import './Sales.css';
import ProductSlider from "../ProductSlider/ProductSlider";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {storeSelect} from "../../redux/core/store/selectors";
import {homeProductsSelect} from "../../widgets/home-widget/model/selectors";

const Sales: React.FC = () => {
    const store = useSelector(storeSelect.path);
    const navigate = useNavigate();
    const products = useSelector(homeProductsSelect.saleProducts);
    const sale = useSelector(homeProductsSelect.sale);

    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const targetDate = new Date(sale.endDate);
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            setTimeLeft({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [sale]);

    if(products.length === 0 || sale.percentage === 0) {
        return null;
    }

    return (
        <div className="sales">
            <div className="sales-header">
                <span/>
                <p>Today's</p>
            </div>
            <div className="sales-title">
                <h2>{sale.name}</h2>
                <div className="sales-title-timer">
                    <div className="sales-title-timer-container">
                        <p>Days</p>
                        <h3>{timeLeft.days}</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Hours</p>
                        <h3>{timeLeft.hours}</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Minutes</p>
                        <h3>{timeLeft.minutes}</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Seconds</p>
                        <h3>{timeLeft.seconds}</h3>
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