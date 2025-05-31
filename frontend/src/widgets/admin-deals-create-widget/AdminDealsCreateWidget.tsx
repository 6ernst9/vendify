import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import './styles.css';
import DealsCreate from "../../components/DealsCreate/DealsCreate";

const AdminDealsCreateWidget: React.FC = () => {
    return (
        <div className='admin-deals-create-widget'>
            <Sidebar/>
            <div className='widget-main-content'>
                <Navbar/>
                <DealsCreate/>
            </div>
        </div>
    )
}

export default AdminDealsCreateWidget;