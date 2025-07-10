import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getStores} from "../admin-store-widget/model/effects";
import ProductEdit from "../../components/ProductCreate/ProductEdit";
import {getProduct} from "../admin-product-page-widget/model/effects";

const AdminProductEditWidget: React.FC = () => {
    const dispatch = useDispatch();
    const id = useSelector(adminSessionSelect.id);
    const accessToken = useSelector(adminSessionSelect.accessToken);

    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const productId = segments[segments.length - 1];

    useEffect(() => {
        getProduct(Number(productId), accessToken, dispatch);
    }, [accessToken, id]);

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [accessToken, id]);

    return (
        <div className="admin-product-edit-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <ProductEdit/>
            </div>
        </div>
    )
}

export default AdminProductEditWidget;