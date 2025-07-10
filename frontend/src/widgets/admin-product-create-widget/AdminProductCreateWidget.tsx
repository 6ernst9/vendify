import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ProductCreate from "../../components/ProductCreate/ProductCreate";
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getStores} from "../admin-store-widget/model/effects";

const AdminProductCreateWidget: React.FC = () => {
    const dispatch = useDispatch();
    const id = useSelector(adminSessionSelect.id);
    const accessToken = useSelector(adminSessionSelect.accessToken);

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [accessToken, id]);

    return (
        <div className="admin-product-create-widget">
            <Sidebar/>
            <div className="widget-main-content">
                <Navbar/>
                <ProductCreate/>
            </div>
        </div>
    )
}

export default AdminProductCreateWidget;