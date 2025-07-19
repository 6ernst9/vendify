import React from "react";
import { useNavigate } from "react-router-dom";
import './AdminAccount.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {endSession} from "../../redux/core/adminSession/reducers";
import {logout} from "../../widgets/admin-login-widget/model/reducers";

const AdminAccount: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = useSelector(adminSessionSelect.id);
    const firstName = useSelector(adminSessionSelect.firstName);
    const lastName = useSelector(adminSessionSelect.lastName);
    const email = useSelector(adminSessionSelect.email);
    const phoneNumber = useSelector(adminSessionSelect.phoneNumber);

    const handleLogout = () => {
        dispatch(endSession());
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className="admin-account-page-container">
            <div className="admin-account-page-header">
                <h1>My Account</h1>
                <div className="admin-account-page-header-buttons">
                    <div className="admin-account-page-configuration-header-button"
                         onClick={() => navigate('/admin/account/edit')}>
                        Edit
                    </div>
                    <div
                        className="admin-account-page-header-button"
                        onClick={() => navigate('/admin/home')}>
                        Back
                    </div>
                </div>
            </div>

            <div className="admin-account-page-info-container">
                <div className="admin-account-page-section">
                    <h1>Account ID</h1>
                    <p>{id}</p>
                </div>
                <hr className="admin-account-page-divider"/>
                <div className="admin-account-page-section">
                    <h1>First Name</h1>
                    <p>{firstName}</p>
                </div>
                <hr className="admin-account-page-divider"/>
                <div className="admin-account-page-section">
                    <h1>Last Name</h1>
                    <p>{lastName}</p>
                </div>
                <hr className="admin-account-page-divider"/>
                <div className="admin-account-page-section">
                    <h1>Email</h1>
                    <p>{email}</p>
                </div>
                <hr className="admin-account-page-divider"/>
                <div className="admin-account-page-section">
                    <h1>Phone</h1>
                    <p>{phoneNumber}</p>
                </div>
            </div>
            <div className="admin-account-page-bottom">
                <div className="admin-account-page-configuration-delete-button"
                     onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default AdminAccount;
