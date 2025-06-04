import React, {useEffect, useState} from "react";
import './styles.css';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RelatedItems from "../../components/RelatedItems/RelatedItems";
import Product from "../../components/Product/Product";
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {useParams} from "react-router-dom";
import {getProductById} from "./model/effects";
import {sessionSelect} from "../../redux/core/session/selectors";
import {ProductDetails} from "../../types/products";
import {defaultProduct} from "./model/default";

const ProductWidget: React.FC = () => {
    const name = useSelector(storeSelect.name);
    const storeId = useSelector(storeSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const [product, setProduct] = useState<ProductDetails>(defaultProduct);
    const { productId } = useParams();

    useEffect(() => {
        document.title = `Product | ${name}`;
    }, [name]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        getProductById({productId: productId || '', storeId, accessToken}).then((response) => {
            setProduct(response);
            console.log(response);
        });
    }, [accessToken, productId]);

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