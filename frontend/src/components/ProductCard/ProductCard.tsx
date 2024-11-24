import React, {JSX, useEffect} from "react";
import './ProductCard.css';
import {ReactComponent as Heart} from '../../assets/icons/heart.svg';
import {ReactComponent as Star} from '../../assets/icons/star.svg';
import {ReactComponent as EmptyStar} from '../../assets/icons/star-half.svg';

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

const ProductCard: React.FC<ProductProps> = ({title, price, oldPrice, stars, reviews, img, sale}) => {
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

    const truncateTitle = (title: string) => {
        if (title.length <= 25) {
            return title;
        }
        return title.substring(0, 23) + '...';
    };


    return (
        <div className="product-card">
            <div className="product-img-container">
                <img src={img}/>
                {sale && (
                    <div className="product-sale-container">
                        <p>-{sale}%</p>
                    </div>
                )}
                <div className="product-like">
                    <Heart/>
                </div>
            </div>
            <h2>{truncateTitle(title)}</h2>
            <div className="product-card-price">
                <p className={oldPrice? 'product-card-discounted-price' : 'product-card-normal-price' }>{price}$</p>
                {oldPrice &&
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

