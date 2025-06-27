import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getProducts} from "./model/effects";

const AdminProductsWidget: React.FC = () => {
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const dispatch = useDispatch();
    const id = useSelector(adminSessionSelect.id);

    useEffect(() => {
        getProducts(id, accessToken, dispatch);
    }, [accessToken, dispatch, id]);

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