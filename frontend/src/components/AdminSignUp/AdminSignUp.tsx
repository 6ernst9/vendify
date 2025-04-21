import React from "react";
import '../AdminLogin/AdminLogin.css';

import {ReactComponent as Logo} from "../../assets/icons/colored-logo.svg";
import {useNavigate} from "react-router-dom";

const AdminSignUp: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-login-box">
            <div className="admin-login-logo">
                <Logo />
                <h2>Vendify <span className="gradient-text">Admin</span></h2>
            </div>
            <div className="admin-login-container">
                <h2 className="admin-login-title">Sign Up</h2>
                <form className="admin-login-form">
                    <label className="admin-login-label">
                        First Name
                        <input type="text" className="admin-login-input" placeholder="John" />
                    </label>

                    <label className="admin-login-label">
                        Last Name
                        <input type="text" className="admin-login-input" placeholder="Doe" />
                    </label>

                    <label className="admin-login-label">
                        Username
                        <input type="text" className="admin-login-input" placeholder="username123" />
                    </label>

                    <label className="admin-login-label">
                        Password
                        <input type="password" className="admin-login-input" placeholder="Choose a password" />
                    </label>

                    <div className="admin-login-button" onClick={() => navigate('/admin')}>
                        Create Account
                    </div>
                </form>
            </div>
            <div className="admin-login-forgot" onClick={() => navigate('/login')}>
                Already have an account?
            </div>
        </div>
    );
};

export default AdminSignUp;
