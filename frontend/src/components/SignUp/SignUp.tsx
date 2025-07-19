import React, {useEffect, useState} from 'react';
import './SignUp.css';
import {register} from "../../widgets/sign-up-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {storeSelect} from "../../redux/core/store/selectors";
import {authSelect} from "../../widgets/admin-login-widget/model/selectors";
import {changePage, setError} from "../../widgets/admin-login-widget/model/reducers";
import {useNavigate} from "react-router-dom";

const SignUp: React.FC = () => {
    const storeId = useSelector((state: RootState) => state.store.id);
    const errorMsg = useSelector(authSelect.authError);
    const store = useSelector(storeSelect.path);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(changePage())
    }, []);

    const handleSignUp = async () => {
        if(email !== '' && password !== '' && firstName !== '' && lastName !== '' && phoneNumber !== '') {
            await register(email, password, firstName, lastName, storeId, phoneNumber, dispatch);
        } else {
            dispatch(setError("Fields cannot be empty"));
        }
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
                <div onClick={() => {
                    dispatch(setError('NO-ERROR'));
                    navigate(`/${store}/login`);
                }}  className="customer-signup-forgot">Already have an account?</div>
            </div>
        </div>
    );
};

export default SignUp;
