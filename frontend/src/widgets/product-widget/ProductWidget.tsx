import React from "react";
import './styles.css';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RelatedItems from "../../components/RelatedItems/RelatedItems";

const ProductWidget: React.FC = () => {
    return (
        <div className="product-widget">
            <Header/>
            <RelatedItems/>
            <Footer/>
        </div>
    )
}

export default ProductWidget;