import React from "react";
import './styles.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Wishlist from "../../components/Wishlist/Wishlist";
import BestSelling from "../../components/BestSelling/BestSelling";
import WishlistProducts from "../../components/WishlistProducts/WishlistProducts";

const WishlistWidget: React.FC = () => {
    return (
        <div className="wishlist-widget">
            <Header/>
            <Wishlist/>
            <WishlistProducts/>
            <BestSelling/>
            <Footer/>
        </div>
    )
}

export default WishlistWidget;