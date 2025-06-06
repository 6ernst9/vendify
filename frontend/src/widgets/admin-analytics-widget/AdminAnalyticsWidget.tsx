import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import Analytics from "../../components/Analytics/Analytics";
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {
    getAvgSessions, getMostCartedProducts, getMostViewedProducts,
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
        getStores({id, accessToken, dispatch});
    }, [id, accessToken]);

    useEffect(() => {
        if(stores.length > 0) {
            getSessionCount({accessToken, storeId: stores[0].id, dispatch});
            getQuickKPIs({accessToken, storeId: stores[0].id, dispatch});
            getSessionRatio({accessToken, storeId: stores[0].id, dispatch});
            getAvgSessions({accessToken, storeId: stores[0].id, dispatch});
            getMostWishlistedProducts({accessToken, storeId: stores[0].id, dispatch});
            getMostViewedProducts({accessToken, storeId: stores[0].id, dispatch});
            getMostCartedProducts({accessToken, storeId: stores[0].id, dispatch});
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