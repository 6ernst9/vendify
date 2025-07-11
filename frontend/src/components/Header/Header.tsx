import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {ReactComponent as Cart} from '../../assets/icons/cart.svg';
import {ReactComponent as Heart} from '../../assets/icons/heart.svg';
import {ReactComponent as User} from '../../assets/icons/user.svg';
import {ReactComponent as Login} from '../../assets/icons/log-in.svg';

import './Header.css';
import {useDispatch, useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {userWishlistSelect} from "../../widgets/wishlist-widget/model/selectors";
import {cartSelect} from "../../widgets/cart-widget/model/selectors";
import {getCart} from "../../widgets/cart-widget/model/effects";
import {getWishlist} from "../../widgets/wishlist-widget/model/effects";
import {updateActivity} from "../../util/session";

const Header: React.FC = () => {
    const store = useSelector(storeSelect.path);
    const name = useSelector(storeSelect.name);
    const logo = useSelector(storeSelect.logo);
    const customerId = useSelector(sessionSelect.id);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const accessToken = useSelector(sessionSelect.accessToken);
    const storeId = useSelector(storeSelect.id);
    const exists = useSelector(sessionSelect.exists);
    const wishlistCount = useSelector(userWishlistSelect.wishlist).length;
    const cartCount = useSelector(cartSelect.totalQuantity);

    useEffect(() => {
        if(exists) {
            getCart(customerId, storeId, accessToken, dispatch);
            getWishlist(customerId, storeId, accessToken, dispatch)
        }
    }, [accessToken, customerId, exists, storeId]);

    const handleSearch = async () => {
        await updateActivity("browse", "search:" + searchQuery, storeId);
        navigate(`/${store}/browse?search=${searchQuery}`);
    }

    return (
        <div className="store-header">
            <Link to={`/${store}`} className="store-header-logo">
                {logo !== '' && <img src={logo}/>}
                <h2>{name}</h2>
            </Link>

            <button className="store-header-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <nav className={`store-header-navbar ${menuOpen ? 'open' : ''}`}>
                <Link to={`/${store}/home`}>Home</Link>
                <Link to={`/${store}/browse`}>Browse</Link>
                <Link to={`/${store}/contact`}>Contact</Link>
            </nav>

            <div className={`store-header-account ${menuOpen ? 'open' : ''}`}>
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    className="store-header-search"/>
                <Link to={exists ? `/${store}/account` : `/${store}/login`} className={"store-header-accounts"}>
                    {exists ? <User/> : <Login/>}
                </Link>
                <Link to={`/${store}/wishlist`} className="store-header-accounts">
                    <div className="store-header-icon-wrapper">
                        <Heart/>
                        {wishlistCount > 0 && <span className="store-header-badge">{wishlistCount}</span>}
                    </div>
                </Link>

                <Link to={`/${store}/cart`} className="store-header-accounts">
                    <div className="store-header-icon-wrapper">
                        <Cart/>
                        {cartCount > 0 && <span className="store-header-badge">{cartCount}</span>}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
