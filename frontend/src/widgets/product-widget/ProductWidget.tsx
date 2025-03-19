import React, {useEffect} from "react";
import './styles.css';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RelatedItems from "../../components/RelatedItems/RelatedItems";
import Product from "../../components/Product/Product";
import {product} from "./mock/products";

const ProductWidget: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="product-widget">
            <Header/>
            <Product {...product}/>
            <RelatedItems/>
            <Footer/>
        </div>
    )
}

export default ProductWidget;