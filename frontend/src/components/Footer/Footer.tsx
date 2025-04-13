import React from "react";
import {ReactComponent as Facebook} from "../../assets/icons/facebook.svg";
import {ReactComponent as LinkedIn} from "../../assets/icons/linkedin.svg";
import {ReactComponent as Instagram} from "../../assets/icons/instagram.svg";
import {ReactComponent as Twitter} from "../../assets/icons/twitter.svg";
import googleplay from '../../assets/img/google_play.png';
import appstore from '../../assets/img/app_store.png';
import qr from '../../assets/img/qr.png';
import "./Footer.css";
import {useNavigate} from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Exclusive</h3>
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
                    <p className="footer-text">exclusive@gmail.com</p>
                    <p className="footer-text">+88015-88888-9999</p>
                </div>

                <div className="footer-section">
                    <h3>Account</h3>
                    <ul className="footer-list">
                        <li onClick={() => navigate("/account")}>My Account</li>
                        <li onClick={() => navigate("/login")}>Login / Register</li>
                        <li onClick={() => navigate("/cart")}>Cart</li>
                        <li onClick={() => navigate("/wishlist")}>Wishlist</li>
                        <li onClick={() => navigate("/browse")}>Shop</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Quick Link</h3>
                    <ul className="footer-list">
                        <li onClick={() => navigate("/privacy")}>Privacy Policy</li>
                        <li onClick={() => navigate("/terms")}>Terms Of Use</li>
                        <li onClick={() => navigate("/faq")}>FAQ</li>
                        <li onClick={() => navigate("/contact")}>Contact</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Download App</h3>
                    <p className="footer-text">Save $3 with App New User Only</p>
                    <div className="footer-qr">
                        <img src={qr}/>
                    </div>
                    <div className="footer-apps">
                        <img src={googleplay} className="footer-app-icon"/>
                        <img src={appstore} className="footer-app-icon"/>
                    </div>
                    <div className="footer-socials">
                        <Facebook/>
                        <LinkedIn/>
                        <Twitter/>
                        <Instagram/>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© Copyright Vendify 2025. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
