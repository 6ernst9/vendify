import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import Analytics from "../../components/Analytics/Analytics";
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {
    getAvgSessions, getMostActiveUsers, getMostCartedProducts, getMostViewedProducts, getMostVisitedPages,
    getMostWishlistedProducts,
    getQuickKPIs,
    getSessionCount,
    getSessionRatio
} from "./model/effects";
import {getStores} from "../admin-store-widget/model/effects";
import {userStoresSelect} from "../admin-store-widget/model/selectors";

const AdminAnalyticsWidget: React.FC = () => {
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const id = useSelector(adminSessionSelect.id);
    const stores = useSelector(userStoresSelect.stores);
    const dispatch = useDispatch();

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [id, accessToken]);

    useEffect(() => {
        if(stores.length > 0) {
            getSessionCount(stores[0].id, accessToken, dispatch);
            getQuickKPIs(stores[0].id, accessToken, dispatch);
            getSessionRatio(stores[0].id, accessToken, dispatch);
            getAvgSessions(stores[0].id, accessToken, dispatch);
            getMostWishlistedProducts(stores[0].id, accessToken, dispatch);
            getMostViewedProducts(stores[0].id, accessToken, dispatch);
            getMostCartedProducts(stores[0].id, accessToken, dispatch);
            getMostActiveUsers(stores[0].id, accessToken, dispatch);
            getMostVisitedPages(stores[0].id, accessToken, dispatch);
        }
    }, [accessToken, stores]);
    return (
        <div className="admin-analytics-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Analytics/>
            </div>
        </div>
    )
}

export default AdminAnalyticsWidget;