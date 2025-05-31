import React, {useState} from 'react';
import './SignUp.css';
import {register} from "../../widgets/sign-up-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {storeSelect} from "../../redux/core/store/selectors";
import {useNavigate} from "react-router-dom";

const SignUp: React.FC = () => {
    const storeId = useSelector((state: RootState) => state.store.id);
    const store = useSelector(storeSelect.path);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        console.log('Sign Up', {firstName, lastName, email, phoneNumber, password});
        await register({firstName, lastName, email, username, phoneNumber, password, store: storeId, dispatch});
        navigate(`/${store}/home`);
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Create your account</h2>
                <p>Enter your details below</p>
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
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <button className="customer-signup-button" onClick={handleSignUp}>Sign Up</button>
                <a href={`/${store}/login`} className="customer-signup-forgot">Already have an account? Log in</a>
            </div>
        </div>
    );
};

export default SignUp;
