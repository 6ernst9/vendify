import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Customers from "../../components/Customers/Customers";
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getCustomers} from "./model/effects";

const AdminCustomersWidget: React.FC = () => {
    const id = useSelector(adminSessionSelect.id);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        getCustomers(id, accessToken, dispatch);
    }, [accessToken, dispatch, id]);
    
    return (
        <div className="admin-customers-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Customers/>
            </div>
        </div>
    )
}

export default AdminCustomersWidget;