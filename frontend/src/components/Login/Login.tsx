import React, {useEffect, useState} from "react";
import './Login.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {login} from "../../widgets/login-widget/model/effects";
import {storeSelect} from "../../redux/core/store/selectors";
import {changePage, setError} from "../../widgets/admin-login-widget/model/reducers";
import {authSelect} from "../../widgets/admin-login-widget/model/selectors";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);
    const storeId = useSelector((state: RootState) => state.store.id);
    const store = useSelector(storeSelect.path);
    const errorMsg = useSelector(authSelect.authError);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(changePage());
    }, []);

    const handleLogin = async () => {
        if(emailOrPhone !== '' && password !== '') {
            await login(emailOrPhone, password, storeId, dispatch);
        } else {
            dispatch(setError("Fields cannot be empty"));
        }
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
                    <div onClick={() => {
                        dispatch(setError('NO-ERROR'));
                        navigate(`/${store}/sign-up`);
                    }} className="customer-login-forgot">Don't have an account?</div>
                </div>
            </div>
        </div>
    )
}

export default Login;