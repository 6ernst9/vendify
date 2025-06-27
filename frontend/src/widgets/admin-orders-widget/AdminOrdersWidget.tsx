import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Orders from "../../components/Orders/Orders";
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getOrders} from "./model/effects";

const AdminOrdersWidget: React.FC = () => {
    const id = useSelector(adminSessionSelect.id);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        getOrders(id, accessToken, dispatch);
    }, [accessToken, dispatch, id]);

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