import React from "react";
import {ReactComponent as Facebook} from "../../assets/icons/facebook.svg";
import {ReactComponent as LinkedIn} from "../../assets/icons/linkedin.svg";
import {ReactComponent as Instagram} from "../../assets/icons/instagram.svg";
import {ReactComponent as Twitter} from "../../assets/icons/twitter.svg";
import qr from '../../assets/img/qr.png';
import "./Footer.css";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);
    const name = useSelector(storeSelect.name);
    const email = useSelector(storeSelect.email);
    const phone = useSelector(storeSelect.phone);
    const facebook = useSelector(storeSelect.facebook);
    const instagram = useSelector(storeSelect.instagram);
    const twitter = useSelector(storeSelect.twitter);

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>{name}</h3>
                    <p className="footer-subtitle">Subscribe</p>
                    <p className="footer-text">Get 10% off your first order</p>
                    <div className="footer-subscribe">
                        <input type="email" placeholder="Enter your email" className="footer-input" />
                        <button className="footer-button">➝</button>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Support</h3>
                    <p className="footer-text">111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
                    <p className="footer-text">{email}</p>
                    <p className="footer-text">{phone}</p>
                </div>

                <div className="footer-section">
                    <h3>Account</h3>
                    <ul className="footer-list">
                        <li onClick={() => navigate(`/${store}/account`)}>My Account</li>
                        <li onClick={() => navigate(`/${store}/login`)}>Login / Register</li>
                        <li onClick={() => navigate(`/${store}/cart`)}>Cart</li>
                        <li onClick={() => navigate(`/${store}/wishlist`)}>Wishlist</li>
                        <li onClick={() => navigate(`/${store}/browse`)}>Shop</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Quick Link</h3>
                    <ul className="footer-list">
                        <li onClick={() => navigate(`/${store}/terms`)}>Privacy Policy</li>
                        <li onClick={() => navigate(`/${store}/terms`)}>Terms Of Use</li>
                        <li onClick={() => navigate(`/${store}/terms`)}>FAQ</li>
                        <li onClick={() => navigate(`/${store}/contact`)}>Contact</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Check Us Out</h3>
                    <p className="footer-text">Save $3 with New User Only</p>
                    <div className="footer-qr">
                        <img src={qr}/>
                    </div>
                    <div className="footer-socials">
                        <Facebook onClick={() => {
                            if(facebook) {
                                navigate(facebook);
                            }
                           }}/>
                        <LinkedIn/>
                        <Twitter onClick={() => {
                            if(twitter) {
                                navigate(twitter);
                            }
                        }}/>
                        <Instagram onClick={() => {
                            if(instagram) {
                                navigate(instagram);
                            }
                        }}/>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© Copyright {name} 2025. © Copyright Vendify 2025. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
