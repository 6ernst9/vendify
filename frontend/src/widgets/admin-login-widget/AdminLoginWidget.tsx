import React from "react";
import AdminLogin from "../../components/AdminLogin/AdminLogin";
import './styles.css';

const AdminLoginWidget: React.FC = () => {
    return (
        <div className="admin-login-widget">
            <AdminLogin/>
        </div>
    )
}

export default AdminLoginWidget;