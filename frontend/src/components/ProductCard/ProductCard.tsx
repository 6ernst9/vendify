import React from "react";
import {ReactComponent as Heart} from '../../assets/icons/heart.svg';

interface ProductProps {
    title: string;
    price: number;
    oldPrice?: number;
    stars: number;
    reviews: number;
    img: string;
    sale: number;
}

const ProductCard: React.FC<ProductProps> = ({title, price, oldPrice, stars, reviews, img, sale}) => {
    return (
        <div className="product-card">
            <div className="product-img-conainer">
                <img src={img}/>
                {sale && (
                    <div className="product-sale-container">
                        <p>{sale}</p>
                    </div>
                )}
                <div className="product-like">
                    <Heart/>
                </div>
            </div>
            <h2>{title}</h2>
        </div>
    )
}

