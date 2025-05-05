import React, {useEffect} from "react";
import ProductCard from "../ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {productsSelect} from "../../widgets/products-browse-widget/model/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {getAllProducts} from "../../widgets/products-browse-widget/model/effects";
import {storeSelect} from "../../redux/core/store/selectors";
import './BrowseProducts.css';

const BrowseProducts: React.FC = () => {
    const products = useSelector(productsSelect.products);
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
                {products.map(product => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        title={product.name}
                        price={product.price}
                        stars={4.7}
                        reviews={product.reviews}
                        img={product.images[0]}
                    />
                ))}
            </div>
        </div>
    );
}

export default BrowseProducts;