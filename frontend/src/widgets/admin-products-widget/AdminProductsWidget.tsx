import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {adminStoreSelect} from "../admin-store-page-widget/model/selectors";
import {getProducts} from "./model/effects";

const AdminProductsWidget: React.FC = () => {
    const accessToken = useSelector(sessionSelect.accessToken);
    const dispatch = useDispatch();
    const store = useSelector(adminStoreSelect.id);

    useEffect(() => {
        getProducts({store, dispatch, accessToken});
    }, [accessToken, dispatch, store]);

    return (
        <div className='admin-products-widget'>
            <Sidebar/>
            <div className='widget-main-content'>
                <Navbar/>
                <Products/>
            </div>
        </div>
    )
}

export default AdminProductsWidget;