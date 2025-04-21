import React from "react";
import './styles.css';
import AdminSignUp from "../../components/AdminSignUp/AdminSignUp";

const AdminSignUpWidget: React.FC = () => {
    return (
        <div className="admin-sign-up-widget">
            <AdminSignUp/>
        </div>
    )
}

export default AdminSignUpWidget;