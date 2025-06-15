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
    getAverageOrder,
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
        getStores({id, accessToken, dispatch});
    }, [id, accessToken]);

    useEffect(() => {
        if(stores.length > 0) {
            getQuickKPIs({accessToken, storeId: stores[0].id, dispatch});
            getAverageOrder({accessToken, storeId: stores[0].id, dispatch});
            getRevenuePerDay({accessToken, storeId: stores[0].id, dispatch});
            getOrdersPerDay({accessToken, storeId: stores[0].id, dispatch});
            getProductRevenue({accessToken, storeId: stores[0].id, dispatch});
            getTopSellingProducts({accessToken, storeId: stores[0].id, dispatch});
            getProductPerformance({accessToken, storeId: stores[0].id, dispatch});
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