import React, {JSX} from "react";
import './ProductCard.css';
import {ReactComponent as Heart} from '../../assets/icons/heart.svg';
import {ReactComponent as Star} from '../../assets/icons/star.svg';
import {ReactComponent as EmptyStar} from '../../assets/icons/star-half.svg';
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
    sale?: number;
}

const ProductCard: React.FC<ProductProps> = ({id, name, price, oldPrice, stars, reviews, images}) => {
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);
    const sale = calculateSalePercentage(price, oldPrice);

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
        <div className="product-card" onClick={() => navigate(`/${store}/product/${id}`)}>
            <div className="product-img-container">
                <img src={images[0]}/>
                {sale > 0 && (
                    <div className="product-sale-container">
                            <p>-{sale}%</p>
                    </div>
                )}
                <div className="product-like">
                    <Heart/>
                </div>
            </div>
            <h2>{truncateTitle(name)}</h2>
            <div className="product-card-price">
                <p className={sale > 0? 'product-card-discounted-price' : 'product-card-normal-price' }>{price}$</p>
                {sale > 0 &&
                    <p className='product-card-normal-price discounted'>{oldPrice}$</p>
                }
            </div>
            <div className="product-card-ratings">
                <div className="product-card-rating-stars">
                    {calculateReviews()}
                </div>
                <p>({reviews})</p>
            </div>
        </div>
    )
}

export default ProductCard;

