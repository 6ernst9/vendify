import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ProductCreate from "../../components/ProductCreate/ProductCreate";
import './styles.css';

const AdminProductCreateWidget: React.FC = () => {
    return (
        <div className="admin-product-create-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <ProductCreate/>
            </div>
        </div>
    )
}

export default AdminProductCreateWidget;