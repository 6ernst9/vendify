import React, { useState } from "react";
import './AdminAccountEdit.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateAccount } from "../../widgets/admin-account-edit-widget/model/effects";
import { adminSessionSelect } from "../../redux/core/adminSession/selectors";

const AdminAccountEditPage: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(adminSessionSelect.accessToken);

    const id = useSelector(adminSessionSelect.id);
    const firstName = useSelector(adminSessionSelect.firstName);
    const lastName = useSelector(adminSessionSelect.lastName);
    const email = useSelector(adminSessionSelect.email);
    const phoneNumber = useSelector(adminSessionSelect.phoneNumber);

    const [first, setFirstName] = useState(firstName);
    const [last, setLastName] = useState(lastName);
    const [mail, setEmail] = useState(email);
    const [phone, setPhoneNumber] = useState(phoneNumber);

    const handleSubmit = async () => {
        await updateAccount(id, first, last, mail, phoneNumber, accessToken);
        navigate("/admin/home");
    };

    return (
        <div className="account-edit-container">
            <div className="account-edit-header">
                <h1>Edit Account</h1>
                <div className="account-edit-header-button" onClick={() => navigate('/admin/account')}>
                    Back
                </div>
            </div>

            <div className="account-edit-info-container">
                <div className="account-edit-selector">
                    <h1>ID</h1>
                    <input type="text" value={id} readOnly />
                </div>
                <div className="account-edit-selector">
                    <h1>First Name</h1>
                    <input value={first} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="account-edit-selector">
                    <h1>Last Name</h1>
                    <input value={last} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="account-edit-selector">
                    <h1>Email</h1>
                    <input value={mail} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="account-edit-selector">
                    <h1>Phone</h1>
                    <input value={phone} onChange={e => setPhoneNumber(e.target.value)} />
                </div>
            </div>

            <div className="account-edit-final-button" onClick={handleSubmit}>
                Edit
            </div>
        </div>
    );
};

export default AdminAccountEditPage;
