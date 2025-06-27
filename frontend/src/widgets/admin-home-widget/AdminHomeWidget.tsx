import React, {useEffect} from "react";
import Dashboards from "../../components/Dashboards/Dashboards";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import {getStores} from "../admin-store-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";

const AdminHomeWidget: React.FC = () => {
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const id = useSelector(adminSessionSelect.id);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Vendify Manager';
    }, []);

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [id, accessToken]);

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