import React from "react";
import './styles.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cart from "../../components/Cart/Cart";

const CartWidget: React.FC = () => {
    return (
        <div className="cart-widget">
            <Header/>
            <Cart/>
            <Footer/>
        </div>
    )
}

export default CartWidget;