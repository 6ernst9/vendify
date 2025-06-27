import React, {useState} from "react";
import './AdminLogin.css';

import {ReactComponent as Logo} from "../../assets/icons/colored-logo.svg";
import {useNavigate} from "react-router-dom";
import {login} from "../../widgets/admin-login-widget/model/effects";
import {useDispatch} from "react-redux";

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
    const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

    const handleSubmit = async () => {
        await login(email, password, dispatch);
    };

    return (
        <div className="admin-login-box">
            <div className="admin-login-logo">
                <Logo/>
                <h2>Vendify <span className="gradient-text">Manager</span></h2>
            </div>
            <div className="admin-login-container">
                <h2 className="admin-login-title">Login</h2>
                <form className="admin-login-form">
                    <label className="admin-login-label">
                        Email
                        <input
                            type="text"
                            className="admin-login-input"
                            onChange={handleEmailChange}
                            placeholder="Your email"/>
                    </label>

                    <label className="admin-login-label">
                        Password
                        <input
                            type="password"
                            className="admin-login-input"
                            onChange={handlePassChange}
                            placeholder="Your password"/>
                    </label>

                    <div className="admin-login-button" onClick={handleSubmit}>Login</div>
                </form>
            </div>
            <div className="admin-login-forgot" onClick={() => navigate('/sign-up')}>Don't have an account?</div>
        </div>
    )
}

export default AdminLogin;