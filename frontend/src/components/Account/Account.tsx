import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Account.css';
import {userOrderSelect} from "../../widgets/account-widget/model/selectors";
import {useNavigate} from "react-router-dom";
import {endSession} from "../../redux/core/session/reducers";
import {storeSelect} from "../../redux/core/store/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {formatNumber, formatShortDate} from "../../util/numbers";
import {setCartItems} from "../../widgets/cart-widget/model/reducers";
import {setWishlistItems} from "../../widgets/wishlist-widget/model/reducers";
import {logOut} from "../../widgets/admin-login-widget/model/effects";

const Account: React.FC = () => {
    const store = useSelector(storeSelect.path);
    const storeId = useSelector(storeSelect.id);
    const [error, setError] = useState('');

    const first = useSelector(sessionSelect.firstName);
    const last = useSelector(sessionSelect.lastName);
    const mail = useSelector(sessionSelect.email);
    const phone = useSelector(sessionSelect.phoneNumber);

    const [firstName, setFirstName] = useState(first);
    const [lastName, setLastName] = useState(last);
    const [email, setEmail] = useState(mail);
    const [phoneNumber, setPhoneNumber] = useState(phone);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const orders = useSelector(userOrderSelect.orders);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cancel = () => {
        setEmail(mail);
        setLastName(last);
        setFirstName(first);
        setPhoneNumber(phone);
        setConfirmPassword("");
        setCurrentPassword("");
        setNewPassword("");
    }

    const update = () => {
        if(email !== mail && firstName!== first && lastName !== last && phoneNumber !== phone && currentPassword!== '' && newPassword!== '' && confirmPassword !== '') {

        } else {
            setError('Fields cannot be empty');
        }
    }

    const logout = () => {
        logOut(storeId);
        dispatch(endSession());
        dispatch(setCartItems([]));
        dispatch(setWishlistItems([]));
        navigate(`/${store}`)
    }
    return (
        <div className="account-page-container">
            <h1 className="account-page-title">Home / Account</h1>
            <h2 className="account-page-section-title">Edit Your Profile</h2>
            <div className="account-page-form">
                <div className="account-page-form-group">
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
                </div>
                <div className="account-page-form-group">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Address"/>
                </div>

                <h3 className="account-page-section-subtitle">Password Changes</h3>
                <div className="account-page-form-group vertical">
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                           placeholder="Current Password"/>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                           placeholder="New Password"/>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                           placeholder="Confirm New Password"/>
                </div>
                {error && error !== '' && <p className="account-error">{error}</p>}

                <div className="account-page-buttons">
                    <button className="logout-btn" onClick={logout}>Logout</button>
                    <div className="account-page-form-actions">
                        <button className="cancel-btn" onClick={cancel}>Cancel</button>
                        <button className="save-btn" onClick={update}>Save Changes</button>
                    </div>
                </div>
            </div>

            <div className="account-page-orders-table">
                <h2 className="account-page-section-title">Your Orders</h2>
                {orders.map((o) => (
                    <div className="account-page-order">
                        <div className="account-page-order-header">
                            <h3>Order No. #{o.id}</h3>
                            <button className="save-btn" onClick={() => navigate(`/${store}/order/${o.id}`)}>View order</button>
                        </div>
                        <div className="account-page-order-bottom">
                            <div className="account-page-order-product-container">
                                <img src={o.img}/>
                                <p>{o.items.reduce((total, item) => total + item.quantity, 0)} items</p>
                            </div>
                            <div className="account-page-order-product-container">
                                <h4>Date ordered</h4>
                                <p>{formatShortDate(o.createdAt)}</p>
                            </div>
                            <div className="account-page-order-product-container">
                                <h4>Total</h4>
                                <p>{formatNumber(o.price)}$</p>
                            </div>
                            <div className="account-page-order-product-container">
                                <h4>Status</h4>
                                <p>{o.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Account;