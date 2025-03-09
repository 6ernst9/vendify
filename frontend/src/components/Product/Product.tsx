import React, {JSX, useState} from "react";
import {ProductDetails} from "../../types/products";
import {ReactComponent as Star} from "../../assets/icons/star.svg";
import {ReactComponent as EmptyStar} from "../../assets/icons/star-half.svg";
import {ReactComponent as Heart} from "../../assets/icons/heart.svg";
import {ReactComponent as Truck} from "../../assets/icons/truck.svg";
import {ReactComponent as Refresh} from "../../assets/icons/refresh.svg";
import {ReactComponent as Minus} from "../../assets/icons/minus.svg";
import {ReactComponent as Plus} from "../../assets/icons/plus.svg";
import './Product.css';

const Product: React.FC<ProductDetails> = ({title, stars, price, reviews, description, img, category}) => {
    const [quantity, setQuantity] = useState(1);
    const calculateReviews = () => {
        const roundedStars: JSX.Element[] = [];
        const roundedReviews = Math.round(stars);

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedReviews) {
                roundedStars.push(<Star/>);
            } else {
                roundedStars.push(<EmptyStar/>);
            }
        }

        return roundedStars;
    }

    return (
        <div className="product">
            <div className="product-category">
                <p>{category} / {title}</p>
            </div>
            <div className="product-container">
                <div className="product-images">
                    <div className="product-thumbnail-images">
                        {[img, img, img, img].map((img, index) => (
                            <img key={index} src={img} className="product-thumbnail"/>
                        ))}
                    </div>
                    <img src={img} className="product-image"/>
                </div>

                <div className="product-details">
                    <h1 className="product-title">{title}</h1>
                    <div className="product-rating">
                        <div className="product-stars">
                            {calculateReviews()}
                        </div>
                        <div className="product-reviews">({reviews} Reviews)</div>
                        <div className="product-stock-status">In Stock</div>
                    </div>
                    <p className="product-price">${price}</p>
                    <p className="product-description">{description}</p>
                    <div className="product-quantity-buttons">
                        <div className="product-quantity-selector">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                    className="product-quantity-btn">
                                <Minus/>
                            </button>
                            <div className="product-quantity">{quantity}</div>
                            <button onClick={() => setQuantity(quantity + 1)} className="product-quantity-btn plus-btn">
                                <Plus/>
                            </button>
                        </div>

                        <div className="product-buy-now">Buy Now</div>
                        <div className="product-wishlist-container">
                             <Heart className="product-wishlist-icon"/>
                        </div>
                    </div>

                    <div className="product-delivery-info">
                        <div className="product-delivery-item">
                            <Truck className="product-delivery-icon"/>
                            <div className="product-delivery-text">
                                <p className="product-delivery-title">Free Delivery</p>
                                <p className="product-delivery-link">Enter your postal code for delivery availability.</p>
                            </div>
                        </div>
                        <div className="product-delivery-item">
                            <Refresh className="product-delivery-icon"/>
                            <div className="product-delivery-text">
                                <p className="product-delivery-title">Return Delivery</p>
                                <p className="product-delivery-text">Free 30 Days Delivery Returns. Details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;