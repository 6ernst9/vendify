import React from "react";
import {useNavigate} from "react-router-dom";
import './ProductPage.css';
import {useSelector} from "react-redux";
import {adminProductSelect} from "../../widgets/admin-product-page-widget/model/selectors";

const ProductPage: React.FC = () => {
    const navigate = useNavigate();

    const name = useSelector(adminProductSelect.name);
    const productId = useSelector(adminProductSelect.id);
    const price = useSelector(adminProductSelect.price);
    const images = useSelector(adminProductSelect.images);
    const description = useSelector(adminProductSelect.description);
    const category = useSelector(adminProductSelect.category);
    const reviews = useSelector(adminProductSelect.reviews);
    const noReviews = useSelector(adminProductSelect.noReviews);
    const store = useSelector(adminProductSelect.store);
    const stock = useSelector(adminProductSelect.stock);

    return (
        <div className="product-page-container">
            <div className="product-page-header">
                <h1>Product:{name}</h1>
                <div className="product-page-header-buttons">
                    <div className="product-page-configuration-header-button" onClick={() => navigate(`/admin/products/edit/${productId}`)}>
                        Edit
                    </div>
                    <div className="product-page-header-button" onClick={() => navigate('/admin/products')}>
                        Back
                    </div>
                </div>
            </div>
            <div className="product-page-configuration-container">
                <div className="product-page-configuration-header">
                    <h1>Product info</h1>
                </div>
                <div className="product-page-configuration-content">
                    <h1>ID</h1>
                    <p>{productId}</p>
                </div>
                <hr className="product-page-divider"/>
                <div className="product-page-configuration-content">
                    <h1>Name</h1>
                    <p>{name}</p>
                </div>
                <hr className="product-page-divider"/>
                <div className="product-page-configuration-content">
                    <h1>Store</h1>
                    <p>#{store}</p>
                </div>
                <hr className="product-page-divider"/>
                <div className="product-page-configuration-content">
                    <h1>Category</h1>
                    <p>{category}</p>
                </div>
                <hr className="product-page-divider"/>
                <div className="product-page-configuration-content">
                    <h1>Description</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className="product-page-configuration-container">
                <div className="product-page-configuration-header">
                    <h1>Product Details</h1>
                </div>
                <div className="product-page-configuration-content">
                    <h1>Images</h1>
                    <p>{images}</p>
                </div>
                <hr className="product-page-divider"/>
                <div className="product-page-configuration-content">
                    <h1>Price</h1>
                    <p>{price}$</p>
                </div>
                <hr className="product-page-divider"/>
                <div className="product-page-configuration-content">
                    <h1>Stock</h1>
                    <p>{stock} pieces</p>
                </div>
                <hr className="product-page-divider"/>
                <div className="product-page-configuration-content">
                    <h1>Reviews</h1>
                    <p>{reviews + ' stars with ' + noReviews + ' reviews.'}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;