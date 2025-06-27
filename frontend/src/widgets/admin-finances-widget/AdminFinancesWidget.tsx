import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';

import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getStores} from "../admin-store-widget/model/effects";
import Finances from "../../components/Finances/Finances";
import {userStoresSelect} from "../admin-store-widget/model/selectors";
import {
    getAverageOrder, getCustomerOrders, getCustomerRatio, getCustomerRevenue,
    getOrdersPerDay, getProductPerformance,
    getProductRevenue,
    getQuickKPIs,
    getRevenuePerDay,
    getTopSellingProducts
} from "./model/effects";

const AdminFinancesWidget: React.FC = () => {
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const id = useSelector(adminSessionSelect.id);
    const stores = useSelector(userStoresSelect.stores);
    const dispatch = useDispatch();

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [id, accessToken]);

    useEffect(() => {
        if(stores.length > 0) {
            getQuickKPIs(stores[0].id, accessToken, dispatch);
            getAverageOrder(stores[0].id, accessToken, dispatch);
            getRevenuePerDay(stores[0].id, accessToken, dispatch);
            getOrdersPerDay(stores[0].id, accessToken, dispatch);
            getProductRevenue(stores[0].id, accessToken, dispatch);
            getTopSellingProducts(stores[0].id, accessToken, dispatch);
            getProductPerformance(stores[0].id, accessToken, dispatch);
            getCustomerOrders(stores[0].id, accessToken, dispatch);
            getCustomerRevenue(stores[0].id, accessToken, dispatch);
            getCustomerRatio(stores[0].id, accessToken, dispatch);
        }
    }, [accessToken, stores]);
    return (
        <div className="admin-finances-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <Finances/>
            </div>
        </div>
    )
}

export default AdminFinancesWidget;