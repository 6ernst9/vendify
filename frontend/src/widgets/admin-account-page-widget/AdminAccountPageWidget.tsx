import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import AdminAccount from "../../components/AdminAccount/AdminAccount";

const AdminAccountPageWidget: React.FC = () => {
    return (
        <div className="admin-account-page-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <AdminAccount/>
            </div>
        </div>
    )
}

export default AdminAccountPageWidget;