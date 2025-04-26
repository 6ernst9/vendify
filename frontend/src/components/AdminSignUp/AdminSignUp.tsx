import React, {useState} from "react";
import '../AdminLogin/AdminLogin.css';

import {ReactComponent as Logo} from "../../assets/icons/colored-logo.svg";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {register} from "../../widgets/admin-sign-up-widget/model/effects";

const AdminSignUp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
    const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value)
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)

    const handleSubmit = async () => {
        await register({username, password, email, firstName, lastName, phoneNumber, dispatch});
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
                        Username
                        <input
                            type="text"
                            className="admin-login-input"
                            placeholder="username123"
                            onChange={handleUsernameChange}/>
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

                    <div className="admin-login-button" onClick={handleSubmit}>
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
