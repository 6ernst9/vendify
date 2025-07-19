import React, {useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import './styles.css';
import DealsCreate from "../../components/DealsCreate/DealsCreate";
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getStores} from "../admin-store-widget/model/effects";

const AdminDealsCreateWidget: React.FC = () => {
    const dispatch = useDispatch();
    const id = useSelector(adminSessionSelect.id);
    const accessToken = useSelector(adminSessionSelect.accessToken);

    useEffect(() => {
        getStores(id, accessToken, dispatch);
    }, [accessToken, id]);

    return (
        <div className='admin-deals-create-widget'>
            <Sidebar/>
            <div className='widget-main-content'>
                <Navbar/>
                <DealsCreate/>
            </div>
        </div>
    )
}

export default AdminDealsCreateWidget;