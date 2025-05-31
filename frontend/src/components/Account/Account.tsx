import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Account.css';
import {userOrderSelect} from "../../widgets/account-widget/model/selectors";
import {useNavigate} from "react-router-dom";
import {endSession} from "../../redux/core/session/reducers";
import {storeSelect} from "../../redux/core/store/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";

const Account: React.FC = () => {
    const store = useSelector(storeSelect.path);
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

    const logout = () => {
        dispatch(endSession());
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

                <div className="account-page-buttons">
                    <button className="logout-btn" onClick={logout}>Logout</button>
                    <div className="account-page-form-actions">
                        <button className="cancel-btn">Cancel</button>
                        <button className="save-btn">Save Changes</button>
                    </div>
                </div>
            </div>

            <h2 className="account-page-section-title">Your Orders</h2>
            <table className="account-page-orders-table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Items</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((o) => (
                    <tr key={o.id}>
                        <td>#{o.id}</td>
                        <td>{o.items.length} items</td>
                        <td>{o.createdAt}</td>
                        <td>${o.price}</td>
                        <td>{o.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default Account;