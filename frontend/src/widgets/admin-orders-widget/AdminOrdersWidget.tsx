import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Orders from "../../components/Orders/Orders";
import './styles.css';

const AdminOrdersWidget: React.FC = () => {
    return (
        <div className="admin-orders-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Orders/>
            </div>
        </div>
    )
}

export default AdminOrdersWidget;