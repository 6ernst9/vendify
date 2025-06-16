import React, {JSX, useState} from "react";
import {ProductDetails} from "../../types/products";
import {ReactComponent as Star} from "../../assets/icons/star.svg";
import {ReactComponent as EmptyStar} from "../../assets/icons/star-half.svg";
import {ReactComponent as Heart} from "../../assets/icons/heart.svg";
import {ReactComponent as HeartFilled} from "../../assets/icons/heart-fill.svg";
import {ReactComponent as Truck} from "../../assets/icons/truck.svg";
import {ReactComponent as Refresh} from "../../assets/icons/refresh.svg";
import {ReactComponent as Minus} from "../../assets/icons/minus.svg";
import {ReactComponent as Plus} from "../../assets/icons/plus.svg";
import './Product.css';
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {storeSelect} from "../../redux/core/store/selectors";
import {addToCart, addToWishlist} from "../../widgets/product-widget/model/effects";
import {useNavigate} from "react-router-dom";
import {userWishlistSelect} from "../../widgets/wishlist-widget/model/selectors";
import {removeFromWishlist} from "../../widgets/wishlist-widget/model/effects";

const Product: React.FC<ProductDetails> = ({id, name, price, reviews, description, images, category}) => {
    const [quantity, setQuantity] = useState(1);
    const accessToken = useSelector(sessionSelect.accessToken);
    const customerId = useSelector(sessionSelect.id);
    const exists = useSelector(sessionSelect.exists);
    const wishlistItems = useSelector(userWishlistSelect.wishlist);
    const isWishlited = wishlistItems.filter((product) => product.id === id).length === 1;
    const storeId = useSelector(storeSelect.id);
    const store = useSelector(storeSelect.path);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const calculateReviews = () => {
        const roundedStars: JSX.Element[] = [];
        const roundedReviews = Math.round(reviews);

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedReviews) {
                roundedStars.push(<Star/>);
            } else {
                roundedStars.push(<EmptyStar/>);
            }
        }

        return roundedStars;
    }

    const handleCart = () => {
        if(exists){
            addToCart({storeId, customerId, quantity, accessToken, dispatch, productId: id});
        } else {
            navigate(`/${store}/login`);
        }
    }

    const handleWishlist = () => {
        if(exists){
            if(isWishlited) {
                removeFromWishlist({storeId, customerId, accessToken, productId: id, dispatch});
            } else {
                addToWishlist({storeId, customerId, accessToken, productId: id, dispatch});
            }
        } else {
            navigate(`/${store}/login`);
        }
    }

    return (
        <div className="product">
            <div className="product-category">
                <p>{category} / {name}</p>
            </div>
            <div className="product-container">
                <div className="product-images">
                    <div className="product-thumbnail-images">
                        {images.map((img, index) => (
                            <img key={index} src={img} className="product-thumbnail"/>
                        ))}
                    </div>
                    <img src={images[0]} className="product-image"/>
                </div>

                <div className="product-details">
                    <h1 className="product-title">{name}</h1>
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

                        <div className="product-buy-now" onClick={handleCart}>Add to cart</div>
                        <div className="product-wishlist-container" onClick={handleWishlist}>
                            {isWishlited ? <HeartFilled className="product-wishlist-icon-wishlisted"/> :  <Heart className="product-wishlist-icon"/>}
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