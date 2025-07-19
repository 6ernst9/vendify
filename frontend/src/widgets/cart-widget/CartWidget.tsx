import React, { useEffect } from "react";
import './styles.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cart from "../../components/Cart/Cart";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {updateActivity} from "../../util/session";
import {storeSelect} from "../../redux/core/store/selectors";

const CartWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);
    const id = useSelector(storeSelect.id);

    useEffect(() => {
        document.title = `Cart | ${name}`;
    }, [name]);

    useEffect(() => {
        updateActivity("cart", "view-cart", id);
    }, []);

    return (
        <div className="cart-widget">
            <Header/>
            <Cart/>
            <Footer/>
        </div>
    )
}

export default CartWidget;