import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import {getOrder} from "./model/effects";
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import OrderPage from "../../components/OrderPage/OrderPage";

const AdminOrderWidget: React.FC = () => {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const id = segments[segments.length - 1];
    
    const dispatch = useDispatch();
    const accessToken = useSelector(adminSessionSelect.accessToken);
    
    useEffect(() => {
        getOrder(id, accessToken, dispatch)
    }, [accessToken, id])

    return (
        <div className="admin-order-page-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <OrderPage/>
            </div>
        </div>
    )
}

export default AdminOrderWidget;