import React from "react";
import './WishlistProduct.css';
import {ReactComponent as Trash} from '../../assets/icons/trash.svg';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    stars: number;
    reviews: number;
    images: string[];
    sale: number;
}

const WishlistProduct: React.FC<ProductProps> = ({id, name, price, oldPrice, images}) => {
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);
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

    return (
        <div className="wishlist-product-card" onClick={() => navigate(`/${store}/product/${id}`)}>
            <div className="wishlist-product-img-container">
                <img src={images[0]}/>
                <div className="wishlist-product-cart">
                    <p>Add To Cart</p>
                </div>
                {sale > 0 && (
                    <div className="wishlist-product-sale-container">
                        <p>-{sale}%</p>
                    </div>
                )}
                <div className="wishlist-product-delete">
                    <Trash/>
                </div>
            </div>
            <h2>{truncateTitle(name)}</h2>
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

