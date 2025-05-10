import React, {useState} from "react";
import './Login.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {login} from "../../widgets/login-widget/model/effects";
import {useNavigate} from "react-router-dom";
import {storeSelect} from "../../redux/core/store/selectors";

const Login: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);
    const storeId = useSelector((state: RootState) => state.store.id);
    const store = useSelector(storeSelect.path);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('Login', {emailOrPhone, password});
        await login({username: emailOrPhone, password, store: storeId, dispatch});
        navigate(`/${store}/home`);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Log in to {name}</h1>
                <p>Enter your details below</p>
                <input
                    type="text"
                    placeholder="Email or Phone Number"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="customer-login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="customer-login-input"
                />

                <div className="customer-login-actions">
                    <button className="customer-login-button" onClick={handleLogin}>Log In</button>
                    <a href="#" className="customer-login-forgot">Forget Password?</a>
                </div>
            </div>
        </div>
    )
}

export default Login;