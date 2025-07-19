import React from "react";
import './WishlistProduct.css';
import {ReactComponent as Trash} from '../../assets/icons/trash.svg';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {removeFromWishlist} from "../../widgets/wishlist-widget/model/effects";
import {addToCart} from "../../widgets/product-widget/model/effects";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    reviews: number;
    images: string[];
}

const WishlistProduct: React.FC<ProductProps> = ({id, name, price, oldPrice, images}) => {
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);
    const storeId = useSelector(storeSelect.id);
    const customerId = useSelector(sessionSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const dispatch = useDispatch();
    const sale = calculateSalePercentage(price, oldPrice);

    const truncateTitle = (title: string) => {
        if (title.length <= 25) {
            return title;
        }
        return title.substring(0, 23) + '...';
    };

    function calculateSalePercentage(price: number, oldPrice: number | undefined): number {
        if (oldPrice === 0 || oldPrice === undefined) return 0;
        return Math.round(((oldPrice - price) / oldPrice) * 100);
    }

    const removeWishlist = () => {
        removeFromWishlist(storeId, customerId, id, accessToken, dispatch);
    }

    const toCart = () => {
        addToCart(storeId, id, customerId, 1, dispatch, accessToken);
        removeFromWishlist(storeId, customerId, id, accessToken, dispatch);
    }

    return (
        <div className="wishlist-product-card">
            <div className="wishlist-product-img-container">
                <img src={images[0]} onClick={() => navigate(`/${store}/product/${id}`)}/>
                <div className="wishlist-product-cart" onClick={toCart}>
                    <p>Add To Cart</p>
                </div>
                {sale > 0 && (
                    <div className="wishlist-product-sale-container">
                        <p>-{sale}%</p>
                    </div>
                )}
                <div className="wishlist-product-delete" onClick={removeWishlist}>
                    <Trash/>
                </div>
            </div>
            <h2 onClick={() => navigate(`/${store}/product/${id}`)}>{truncateTitle(name)}</h2>
            <div className="wishlist-product-card-price">
                <p className={sale > 0? 'wishlist-product-card-discounted-price' : 'wishlist-product-card-normal-price' }>{price}$</p>
                {sale > 0 &&
                    <p className='wishlist-product-card-normal-price discounted'>{oldPrice}$</p>
                }
            </div>
        </div>
    )
}

export default WishlistProduct;

