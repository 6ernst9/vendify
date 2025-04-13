import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Company from "../../components/Company/Company";
import './styles.css';

const AdminStoreWidget: React.FC = () => {
    return (
        <div className="admin-store-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Company/>
            </div>
        </div>
    )
}

export default AdminStoreWidget;