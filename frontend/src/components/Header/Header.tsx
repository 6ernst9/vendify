import React from "react";
import {Link} from "react-router-dom";

import {ReactComponent as Cart} from '../../assets/icons/cart.svg';
import {ReactComponent as Heart} from '../../assets/icons/heart.svg';
import {ReactComponent as User} from '../../assets/icons/user.svg';

import './Header.css';

const Header: React.FC = () => {
    return (
        <div className="store-header">
            <Link to="/" className="store-header-logo">Exclusive</Link>

            <nav className="store-header-navbar">
                <Link to="/">Home</Link>
                <Link to="/browse">Browse</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
            </nav>

            <div className="store-header-account">
                <input type="text" placeholder="Search..." className="store-header-search"/>
                <Link to="/account" className="store-header-accounts">
                    <User/>
                </Link>
                <Link to="/wishlist" className="store-header-accounts">
                    <Heart/>
                </Link>
                <Link to="/cart" className="store-header-accounts">
                   <Cart/>
                </Link>
            </div>
        </div>
    );
};

export default Header;
