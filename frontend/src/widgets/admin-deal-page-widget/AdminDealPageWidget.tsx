import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import DealPage from "../../components/DealPage/DealPage";
import {getDeal} from "./model/effects";

const AdminDealPageWidget: React.FC = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(adminSessionSelect.accessToken);

    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const id = segments[segments.length - 1];

    useEffect(() => {
        getDeal(Number(id), accessToken, dispatch);
    }, [accessToken, id]);

    return (
        <div className="admin-deal-page-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <DealPage/>
            </div>
        </div>
    )
}

export default AdminDealPageWidget;