import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import Analytics from "../../components/Analytics/Analytics";

const AdminAnalyticsWidget: React.FC = () => {
    return (
        <div className="admin-analytics-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Analytics/>
            </div>
        </div>
    )
}

export default AdminAnalyticsWidget;