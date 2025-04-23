import React, { useEffect } from "react";
import './styles.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cart from "../../components/Cart/Cart";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const CartWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);

    useEffect(() => {
        document.title = `Cart | ${name}`;
    }, [name]);

    return (
        <div className="cart-widget">
            <Header/>
            <Cart/>
            <Footer/>
        </div>
    )
}

export default CartWidget;