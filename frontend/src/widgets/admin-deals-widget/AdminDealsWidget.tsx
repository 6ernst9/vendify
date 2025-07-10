import React, {useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Deals from "../../components/Deals/Deals";
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {getDeals} from "./model/effects";

const AdminDealsWidget: React.FC = () => {
    const id = useSelector(adminSessionSelect.id);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        getDeals(id, accessToken, dispatch);
    }, [accessToken, id]);
    return (
        <div className='admin-deals-widget'>
            <Sidebar/>
            <div className='widget-main-content'>
                <Navbar/>
                <Deals/>
            </div>
        </div>
    )
}

export default AdminDealsWidget;