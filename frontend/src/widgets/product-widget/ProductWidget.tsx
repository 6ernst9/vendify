import React, {useEffect} from "react";
import './styles.css';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RelatedItems from "../../components/RelatedItems/RelatedItems";
import Product from "../../components/Product/Product";
import {useDispatch, useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {useParams} from "react-router-dom";
import {getProductById, getRelatedProducts} from "./model/effects";
import {sessionSelect} from "../../redux/core/session/selectors";

const ProductWidget: React.FC = () => {
    const name = useSelector(storeSelect.name);
    const storeId = useSelector(storeSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const { productId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `Product | ${name}`;
    }, [name]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if(productId !== undefined && productId !== '') {
            getProductById(Number(productId), storeId, accessToken, dispatch);
            getRelatedProducts(Number(productId), accessToken, dispatch);
        }
    }, [accessToken, productId, storeId]);

    return (
        <div className="product-widget">
            <Header/>
            <Product/>
            <RelatedItems/>
            <Footer/>
        </div>
    )
}

export default ProductWidget;