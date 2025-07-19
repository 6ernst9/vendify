import React, {JSX, useState} from "react";
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
import {currentProductSelect} from "../../widgets/product-widget/model/selectors";

const Product: React.FC = () => {
    const product = useSelector(currentProductSelect.product);
    const [quantity, setQuantity] = useState(1);
    const accessToken = useSelector(sessionSelect.accessToken);
    const customerId = useSelector(sessionSelect.id);
    const exists = useSelector(sessionSelect.exists);
    const wishlistItems = useSelector(userWishlistSelect.wishlist);
    const isWishlited = wishlistItems.filter((p) => p.id === product.id).length === 1;
    const storeId = useSelector(storeSelect.id);
    const sale = calculateSalePercentage(product.price, product.oldPrice);

    const store = useSelector(storeSelect.path);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function calculateSalePercentage(price: number, oldPrice: number | undefined): number {
        if (oldPrice === 0 || oldPrice === undefined) return 0;
        return Math.round(((oldPrice - price) / oldPrice) * 100);
    }

    const calculateReviews = () => {
        const roundedStars: JSX.Element[] = [];
        const roundedReviews = Math.round(product.reviews);

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
            addToCart(storeId, product.id, customerId, quantity, dispatch, accessToken);
        } else {
            navigate(`/${store}/login`);
        }
    }

    const handleWishlist = () => {
        if(exists){
            if(isWishlited) {
                removeFromWishlist(storeId, customerId, product.id, accessToken, dispatch);
            } else {
                addToWishlist(storeId, product.id, customerId, accessToken, dispatch);
            }
        } else {
            navigate(`/${store}/login`);
        }
    }

    return (
        <div className="product">
            <div className="product-category">
                <p>{product.category} / {product.name}</p>
            </div>
            <div className="product-container">
                <div className="product-images">
                    <div className="product-thumbnail-images">
                        {product.images.map((img, index) => (
                            <img key={index} src={img} className="product-thumbnail" alt={product.name}/>
                        ))}
                    </div>
                    <img src={product.images[0]} className="product-image" alt={product.name}/>
                </div>

                <div className="product-details">
                    <h1 className="product-title">{product.name}</h1>
                    <div className="product-rating">
                        <div className="product-stars">
                            {calculateReviews()}
                        </div>
                        <div className="product-reviews">({product.noReviews})</div>
                        {product.stock > 0 ? <div className="product-stock-status">In Stock</div> :
                            <div className="product-out-stock-status">Out of Stock</div>}

                    </div>
                    <div className="product-price-container">
                        <p className={sale > 0? 'product-price-discounted' : 'product-price' }>{product.price}$</p>
                        {sale > 0 &&
                            <p className='product-price-normal discounted'>{product.oldPrice}$</p>
                        }
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-quantity-buttons">
                        {product.stock > 0 && (<div className="product-quantity-selector">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                    className="product-quantity-btn">
                                <Minus/>
                            </button>
                            <div className="product-quantity">
                                <p>{quantity}</p>
                            </div>
                            <button onClick={() => setQuantity(quantity === product.stock ? quantity : quantity + 1)}
                                    className="product-quantity-btn plus-btn">
                                <Plus/>
                            </button>
                        </div>)}
                        {product.stock > 0 && (<div className="product-buy-now" onClick={handleCart}>Add to cart</div>)}
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