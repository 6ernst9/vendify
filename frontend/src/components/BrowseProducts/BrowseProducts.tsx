import React, {useEffect} from "react";
import ProductCard from "../ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {productsSelect} from "../../widgets/products-browse-widget/model/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {getAllProducts} from "../../widgets/products-browse-widget/model/effects";
import {storeSelect} from "../../redux/core/store/selectors";
import './BrowseProducts.css';
import Skeleton from "react-loading-skeleton";

const BrowseProducts: React.FC = () => {
    const products = useSelector(productsSelect.products);
    const hasPreloaded = useSelector(productsSelect.hasPreloaded);
    const store = useSelector(storeSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllProducts({store, accessToken, dispatch});
    }, [accessToken, store]);
    return (
        <div className="browse-container">
            <h1 className="browse-title">Home / Browse</h1>
            <div className="browse-grid">
                {hasPreloaded
                    ? products.map(product => (
                        <ProductCard
                            id={product.id}
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            stars={4.7}
                            reviews={product.reviews}
                            images={product.images}
                        />
                    ))
                : [...Array(6)].map((_, i) => (
                        <div className="product-card" key={i}>
                            <Skeleton height={200}/>
                            <Skeleton width="60%"/>
                            <Skeleton width="40%"/>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default BrowseProducts;