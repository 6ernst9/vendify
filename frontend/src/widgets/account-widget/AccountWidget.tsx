import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Account from "../../components/Account/Account";
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {getOrdersByCustomer} from "./model/effects";
import {storeSelect} from "../../redux/core/store/selectors";
import './styles.css';

const AccountWidget: React.FC = () => {
    const dispatch = useDispatch();
    const name = useSelector(storeSelect.name);
    const storeId = useSelector(storeSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const id = useSelector(sessionSelect.id);

    useEffect(() => {
        getOrdersByCustomer(id, storeId, dispatch, accessToken);
    }, [accessToken, storeId, dispatch, id]);

    useEffect(() => {
        document.title = `Account | ${name}`;
    }, [name]);
    
    return (
        <div className="account-widget">
            <Header/>
            <Account/>
            <Footer/>
        </div>
    )
}

export default AccountWidget;