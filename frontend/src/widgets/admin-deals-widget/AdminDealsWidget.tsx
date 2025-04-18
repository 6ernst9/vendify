import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Deals from "../../components/Deals/Deals";
import './styles.css';

const AdminDealsWidget: React.FC = () => {
    return (
        <div className='admin-deals-widget'>
            <Sidebar/>
            <div className='widget-main-content'>
                <Navbar/>
                <Deals/>
            </div>
        </div>
    )
}

export default AdminDealsWidget;