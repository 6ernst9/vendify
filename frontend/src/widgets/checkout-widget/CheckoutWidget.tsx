import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Checkout from "../../components/Checkout/Checkout";
import './styles.css';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const CheckoutWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);

    useEffect(() => {
        document.title = `Checkout | ${name}`;
    }, [name]);

    return (
        <div className="checkout-widget">
            <Header/>
            <Checkout/>
            <Footer/>
        </div>
    )
}

export default CheckoutWidget;