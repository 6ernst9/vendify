import React from "react";
import './AdminLogin.css';

import {ReactComponent as Logo} from "../../assets/icons/colored-logo.svg";
import {useNavigate} from "react-router-dom";

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-login-box">
            <div className="admin-login-logo">
                <Logo/>
                <h2>Vendify <span className="gradient-text">Admin</span></h2>
            </div>
            <div className="admin-login-container">
                <h2 className="admin-login-title">Login</h2>
                <form className="admin-login-form">
                    <label className="admin-login-label">
                        Username
                        <input type="text" className="admin-login-input" placeholder="Your username"/>
                    </label>

                    <label className="admin-login-label">
                        Password
                        <input type="password" className="admin-login-input" placeholder="Your password"/>
                    </label>

                    <div className="admin-login-button" onClick={() => navigate('/admin')}>Login</div>
                </form>
            </div>
            <div className="admin-login-forgot" onClick={() => navigate('/sign-up')}>Don't have an account?</div>
        </div>
    )
}

export default AdminLogin;