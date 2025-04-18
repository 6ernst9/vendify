import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";
import './styles.css'

const AdminProductsWidget: React.FC = () => {
    return (
        <div className='admin-products-widget'>
            <Sidebar/>
            <div className='widget-main-content'>
                <Navbar/>
                <Products/>
            </div>
        </div>
    )
}

export default AdminProductsWidget;