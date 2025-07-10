import React from "react";
import image from '../../assets/img/banner.png';
import './Banner.css';
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {useNavigate} from "react-router-dom";

const Banner: React.FC = () => {
    const categories = useSelector(storeSelect.categories);
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);
    const banner = useSelector(storeSelect.banner);

    if(banner === '') {
        return null;
    }

    return (
        <div className="banner">
            <div className="banner-categories">
                {categories.map((category) => <p onClick={() => navigate(`/${store}/browse?category=${category}`)}>{category}</p>)}
            </div>
            <div className="banner-img-container">
                <img src={image} className="banner-img"/>
            </div>
        </div>
    )
}

export default Banner;