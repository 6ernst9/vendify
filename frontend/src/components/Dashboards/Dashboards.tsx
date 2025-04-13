import React from "react";
import './Dashboards.css';

const Dashboards: React.FC = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-widgets">
                <div className="widget">Sales Performance</div>
                <div className="widget">Sales Analytics</div>
                <div className="widget">Task KPI by Status</div>
            </div>
        </div>
    );
}

export default Dashboards;