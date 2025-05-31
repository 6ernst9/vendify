import React from "react";
import image from '../../assets/img/banner.png';
import './Banner.css';
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

const Banner: React.FC = () => {
    const categories = useSelector(storeSelect.categories);
    return (
        <div className="banner">
            <div className="banner-categories">
                {categories.map((category) => <p>{category}</p>)}
            </div>
            <div className="banner-img-container">
                <img src={image} className="banner-img"/>
            </div>
        </div>
    )
}

export default Banner;