import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import AdminAccountEdit from "../../components/AdminAccountEdit/AdminAccountEdit";

const AdminAccountPageWidget: React.FC = () => {
    return (
        <div className="admin-account-edit-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <AdminAccountEdit/>
            </div>
        </div>
    )
}

export default AdminAccountPageWidget;