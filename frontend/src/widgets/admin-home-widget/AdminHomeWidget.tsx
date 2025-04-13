import React from "react";
import Dashboards from "../../components/Dashboards/Dashboards";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';

const AdminHomeWidget: React.FC = () => {
    return (
        <div className="admin-home-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Dashboards/>
            </div>
        </div>
    )
}

export default AdminHomeWidget;