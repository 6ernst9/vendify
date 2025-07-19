import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import CompanyCreate from "../../components/CompanyCreate/CompanyCreate";

const AdminStoreCreateWidget: React.FC = () => {
    return (
        <div className="admin-store-create-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <CompanyCreate/>
            </div>
        </div>
    )
}

export default AdminStoreCreateWidget;