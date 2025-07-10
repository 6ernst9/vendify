import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import CompanyEdit from "../../components/CompanyCreate/CompanyEdit";
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getStore} from "../admin-store-page-widget/model/effects";

const AdminStoreEditWidget: React.FC = () => {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const id = segments[segments.length - 1];

    const dispatch = useDispatch();
    const accessToken = useSelector(adminSessionSelect.accessToken);

    useEffect(() => {
        getStore(id, accessToken, dispatch)
    }, [accessToken, id])

    return (
        <div className="admin-store-edit-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <CompanyEdit/>
            </div>
        </div>
    )
}

export default AdminStoreEditWidget;