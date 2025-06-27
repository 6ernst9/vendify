import React, {useEffect, useState} from "react";
import ProductCard from "../ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {productsSelect} from "../../widgets/products-browse-widget/model/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {getAllProducts} from "../../widgets/products-browse-widget/model/effects";
import {storeSelect} from "../../redux/core/store/selectors";
import './BrowseProducts.css';
import BrowseSkeleton from "./BrowseSkeleton";
import {useSearchParams} from "react-router-dom";
import {Product} from "../../types/products";

const BrowseProducts: React.FC = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const [title, setTitle] = useState('Browse');

    const products = useSelector(productsSelect.products);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const hasPreloaded = useSelector(productsSelect.hasPreloaded);
    const store = useSelector(storeSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllProducts(store, accessToken, dispatch);
    }, [accessToken, store]);

    useEffect(() => {
        let result = products;

        if (category) {
            result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
            setTitle("Category / " + category);
        } else if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description?.toLowerCase().includes(search.toLowerCase())
            );
            setTitle("Search / " + search)
        } else {
            setTitle("Browse");
        }

        setFilteredProducts(result);
    }, [products, category, search]);

    if(!hasPreloaded) {
        return <BrowseSkeleton/>
    }
    return (
        <div className="browse-container">
            <h1 className="browse-title">Home / {title}</h1>
            <div className="browse-grid">
                {filteredProducts.map(product => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        reviews={product.reviews}
                        noReviews={product.noReviews}
                        images={product.images}
                        stock={product.stock}
                    />
                ))}
            </div>
        </div>
    );
}

export default BrowseProducts;