import React from "react";
import {Link, useNavigate} from "react-router-dom";

import {ReactComponent as Logo} from "../../assets/icons/colored-logo.svg";

import './Topbar.css';

const Topbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage-topbar">
            <Link to="/" className="homepage-topbar-logo">
                <Logo/>
                <h2>vendify</h2>
            </Link>

            <nav className="homepage-topbar-navbar">
                <Link to="/home">Solutions</Link>
                <Link to="/home">Pricing</Link>
                <Link to="/home">About</Link>
            </nav>

            <div className="homepage-topbar-buttons">
                <p onClick={() => navigate('/login')}>Log in</p>
                <div className="homepage-trial-button"
                     onClick={() => navigate('/sign-up')}>
                    Start here
                </div>
            </div>
        </div>
    );
};

export default Topbar;
