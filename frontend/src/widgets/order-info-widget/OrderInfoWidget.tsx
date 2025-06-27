import React, {useEffect} from "react";
import './styles.css';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {useParams} from "react-router-dom";
import {sessionSelect} from "../../redux/core/session/selectors";
import {getOrder} from "./model/effects";
import OrderInfo from "../../components/OrderInfo/OrderInfo";

const OrderInfoWidget: React.FC = () => {
    const name = useSelector(storeSelect.name);
    const storeId = useSelector(storeSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const { orderId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `Order | ${name}`;
    }, [name]);

    useEffect(() => {
        if(orderId !== undefined && orderId !== '') {
            getOrder( orderId || '', storeId, accessToken, dispatch);
        }
    }, [accessToken, orderId, storeId]);

    return (
        <div className="order-widget">
            <Header/>
            <OrderInfo/>
            <Footer/>
        </div>
    )
}

export default OrderInfoWidget;