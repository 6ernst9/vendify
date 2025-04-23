import React from "react";
import {Link} from "react-router-dom";

import {ReactComponent as Cart} from '../../assets/icons/cart.svg';
import {ReactComponent as Heart} from '../../assets/icons/heart.svg';
import {ReactComponent as User} from '../../assets/icons/user.svg';

import './Header.css';
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

const Header: React.FC = () => {
    const store = useSelector(storeSelect.slug);
    const name = useSelector(storeSelect.name);

    return (
        <div className="store-header">
            <Link to="/" className="store-header-logo">
                <h2>{name}</h2>
            </Link>

            <nav className="store-header-navbar">
                <Link to={`/${store}`}>Home</Link>
                <Link to={`/${store}/browse`}>Browse</Link>
                <Link to={`/${store}/contact`}>Contact</Link>
                <Link to={`/${store}/about`}>About</Link>
            </nav>

            <div className="store-header-account">
                <input type="text" placeholder="Search..." className="store-header-search"/>
                <Link to={`/${store}/account`} className="store-header-accounts">
                    <User/>
                </Link>
                <Link to={`/${store}/wishlist`} className="store-header-accounts">
                    <Heart/>
                </Link>
                <Link to={`/${store}/cart`} className="store-header-accounts">
                   <Cart/>
                </Link>
            </div>
        </div>
    );
};

export default Header;
