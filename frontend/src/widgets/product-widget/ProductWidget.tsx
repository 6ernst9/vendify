import React, {useEffect} from "react";
import './styles.css';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RelatedItems from "../../components/RelatedItems/RelatedItems";
import Product from "../../components/Product/Product";
import {product} from "./mock/products";
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

const ProductWidget: React.FC = () => {
    const name = useSelector(storeSelect.name);

    useEffect(() => {
        document.title = `Product | ${name}`;
    }, [name]);

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