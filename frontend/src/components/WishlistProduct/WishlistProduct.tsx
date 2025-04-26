import React from "react";
import './WishlistProduct.css';
import {ReactComponent as Trash} from '../../assets/icons/trash.svg';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

interface ProductProps {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    stars: number;
    reviews: number;
    img: string;
    sale: number;
}

const WishlistProduct: React.FC<ProductProps> = ({title, price, oldPrice, img, sale}) => {
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);

    const truncateTitle = (title: string) => {
        if (title.length <= 25) {
            return title;
        }
        return title.substring(0, 23) + '...';
    };

    return (
        <div className="wishlist-product-card" onClick={() => navigate(`/${store}/product`)}>
            <div className="wishlist-product-img-container">
                <img src={img}/>
                <div className="wishlist-product-cart">
                    <p>Add To Cart</p>
                </div>
                {sale && (
                    <div className="wishlist-product-sale-container">
                        <p>-{sale}%</p>
                    </div>
                )}
                <div className="wishlist-product-delete">
                    <Trash/>
                </div>
            </div>
            <h2>{truncateTitle(title)}</h2>
            <div className="wishlist-product-card-price">
                <p className={oldPrice? 'wishlist-product-card-discounted-price' : 'wishlist-product-card-normal-price' }>{price}$</p>
                {oldPrice &&
                    <p className='wishlist-product-card-normal-price discounted'>{oldPrice}$</p>
                }
            </div>
        </div>
    )
}

export default WishlistProduct;

