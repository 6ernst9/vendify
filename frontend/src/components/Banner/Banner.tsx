import React from "react";
import image from '../../assets/img/banner.png';
import './Banner.css';

const Banner: React.FC = () => {
    return (
        <div className="banner">
            <div className="banner-categories">
                <p>Women's Fashion</p>
                <p>Men's Fashion</p>
                <p>Electronics</p>
                <p>Home & Lifestyle</p>
                <p>Medicine</p>
                <p>Sports & Outdoor</p>
                <p>Baby's & Toys</p>
                <p>Groceries & Pets</p>
                <p>Health & Beauty</p>
            </div>
            <div className="banner-img-container">
                <img src={image} className="banner-img"/>
            </div>
        </div>
    )
}

export default Banner;