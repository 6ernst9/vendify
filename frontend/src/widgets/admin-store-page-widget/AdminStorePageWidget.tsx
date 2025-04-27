import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import CompanyPage from "../../components/CompanyPage/CompanyPage";
import {getStore} from "./model/effects";
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";

const AdminStorePageWidget: React.FC = () => {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const path = segments[segments.length - 1];
    
    const dispatch = useDispatch();
    const accessToken = useSelector(sessionSelect.accessToken);
    
    useEffect(() => {
        getStore({path, accessToken, dispatch})
    }, [accessToken, path])

    return (
        <div className="admin-store-page-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <CompanyPage/>
            </div>
        </div>
    )
}

export default AdminStorePageWidget;