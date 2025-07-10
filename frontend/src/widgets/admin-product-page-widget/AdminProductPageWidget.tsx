import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getProduct} from "./model/effects";
import ProductPage from "../../components/ProductPage/ProductPage";

const AdminProductPageWidget: React.FC = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(adminSessionSelect.accessToken);

    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const id = segments[segments.length - 1];

    useEffect(() => {
        getProduct(Number(id), accessToken, dispatch);
    }, [accessToken, id]);

    return (
        <div className="admin-product-page-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <ProductPage/>
            </div>
        </div>
    )
}

export default AdminProductPageWidget;