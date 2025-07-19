import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getStores} from "../admin-store-widget/model/effects";
import Logs from "../../components/Logs/Logs";
import './styles.css';

const AdminLogsWidget: React.FC = () => {
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const id = useSelector(adminSessionSelect.id);
    const dispatch = useDispatch();

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [id, accessToken]);

    return (
        <div className="admin-logs-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Logs/>
            </div>
        </div>
    )
}

export default AdminLogsWidget;