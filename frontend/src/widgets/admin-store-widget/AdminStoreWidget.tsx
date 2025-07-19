import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Company from "../../components/Company/Company";
import './styles.css';
import {getStores} from "./model/effects";
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";

const AdminStoreWidget: React.FC = () => {
    const dispatch = useDispatch();
    const id = useSelector(adminSessionSelect.id);
    const accessToken = useSelector(adminSessionSelect.accessToken);

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [accessToken, id]);

    return (
        <div className="admin-store-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Company/>
            </div>
        </div>
    )
}

export default AdminStoreWidget;