import React, {useEffect, useState} from 'react';
import './SignUp.css';
import {register} from "../../widgets/sign-up-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {storeSelect} from "../../redux/core/store/selectors";
import {useNavigate} from "react-router-dom";
import {authSelect} from "../../widgets/admin-login-widget/model/selectors";
import {changePage} from "../../widgets/admin-login-widget/model/reducers";

const SignUp: React.FC = () => {
    const storeId = useSelector((state: RootState) => state.store.id);
    const errorMsg = useSelector(authSelect.authError);
    const store = useSelector(storeSelect.path);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(changePage())
    }, []);

    const handleSignUp = async () => {
        await register(email, password, firstName, lastName, storeId, phoneNumber, dispatch);
        navigate(`/${store}/home`);
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Create your account</h1>
                <p className="signup-details">Enter your details below</p>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="customer-signup-input"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="customer-signup-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="customer-signup-input"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="customer-signup-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="customer-signup-input"
                />
                {errorMsg !== '' && errorMsg !== 'NO-ERROR' && <p className="customer-signup-error">{errorMsg}</p>}
                <button className="customer-signup-button" onClick={handleSignUp}>Sign Up</button>
                <a href={`/${store}/login`} className="customer-signup-forgot">Already have an account?</a>
            </div>
        </div>
    );
};

export default SignUp;
