import React, {useEffect, useState} from "react";
import './Login.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {login} from "../../widgets/login-widget/model/effects";
import {useNavigate} from "react-router-dom";
import {storeSelect} from "../../redux/core/store/selectors";
import {changePage} from "../../widgets/admin-login-widget/model/reducers";
import {authSelect} from "../../widgets/admin-login-widget/model/selectors";

const Login: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);
    const storeId = useSelector((state: RootState) => state.store.id);
    const store = useSelector(storeSelect.path);
    const errorMsg = useSelector(authSelect.authError);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(changePage());
    }, []);

    useEffect(() => {
        if(errorMsg === 'NO-ERROR') {
            navigate(`/${store}/home`);
        }
    }, [store, errorMsg]);

    const handleLogin = async () => {
        await login(emailOrPhone, password, storeId, dispatch);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Log in to {name}</h1>
                <p className="login-details">Enter your details below</p>
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

                {errorMsg !== '' && errorMsg !== 'NO-ERROR' && <p className="customer-login-error">{errorMsg}</p>}
                <div className="customer-login-actions">
                    <button className="customer-login-button" onClick={handleLogin}>Log In</button>
                    <a href={`/${store}/sign-up`} className="customer-login-forgot">Don't have an account?</a>
                </div>
            </div>
        </div>
    )
}

export default Login;