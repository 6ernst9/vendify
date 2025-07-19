import React, {useState} from "react";
import '../AdminLogin/AdminLogin.css';

import {ReactComponent as Logo} from "../../assets/icons/colored-logo.svg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../widgets/admin-sign-up-widget/model/effects";
import {authSelect} from "../../widgets/admin-login-widget/model/selectors";
import {setError} from "../../widgets/admin-login-widget/model/reducers";

const AdminSignUp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorMsg = useSelector(authSelect.authError);

    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value)
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)

    const handleSubmit = async () => {
        if(email !== '' && password !== '' && firstName !== '' && lastName !== '' && phoneNumber !== '') {
            await register(email, password, firstName, lastName, phoneNumber, dispatch);
        } else {
            dispatch(setError("Fields cannot be empty"));
        }
    };

    return (
        <div className="admin-login-box">
            <div className="admin-login-logo">
                <Logo />
                <h2>Vendify <span className="gradient-text">Manager</span></h2>
            </div>
            <div className="admin-login-container">
                <h2 className="admin-login-title">Sign Up</h2>
                <form className="admin-login-form">
                    <label className="admin-login-label">
                        First Name
                        <input
                            type="text"
                            className="admin-login-input"
                            placeholder="John"
                            onChange={handleFirstNameChange}/>
                    </label>

                    <label className="admin-login-label">
                        Last Name
                        <input
                            type="text"
                            className="admin-login-input"
                            placeholder="Doe"
                            onChange={handleLastNameChange}/>
                    </label>

                    <label className="admin-login-label">
                        Email
                        <input
                            type="text"
                            className="admin-login-input"
                            placeholder="johndoe@gmail.com"
                            onChange={handleEmailChange}/>
                    </label>

                    <label className="admin-login-label">
                        Phone
                        <input
                            type="text"
                            className="admin-login-input"
                            placeholder="+32412212323"
                            onChange={handlePhoneChange}/>
                    </label>

                    <label className="admin-login-label">
                        Password
                        <input
                            type="password"
                            className="admin-login-input"
                            placeholder="Choose a password"
                            onChange={handlePassChange}/>
                    </label>
                    {errorMsg !== '' && errorMsg !== 'NO-ERROR' && <p className="admin-login-error">{errorMsg}</p>}
                    <div className="admin-login-button" onClick={handleSubmit}>
                        Create Account
                    </div>
                </form>
            </div>
            <div className="admin-login-forgot" onClick={() => {
                dispatch(setError('NO-ERROR'));
                navigate('/login');
            }}>
                Already have an account?
            </div>
        </div>
    );
};

export default AdminSignUp;
