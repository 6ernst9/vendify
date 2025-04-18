import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Customers from "../../components/Customers/Customers";
import './styles.css';

const AdminCustomersWidget: React.FC = () => {
    return (
        <div className="admin-customers-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Customers/>
            </div>
        </div>
    )
}

export default AdminCustomersWidget;