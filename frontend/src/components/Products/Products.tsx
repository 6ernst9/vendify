import React, {useState} from "react";
import './Products.css';
import {ReactComponent as Search} from "../../assets/icons/search.svg";
import image from '../../assets/img/img.png';
import {useSelector} from "react-redux";
import {userProductsSelect} from "../../widgets/admin-products-widget/model/selectors";
import {useNavigate} from "react-router-dom";

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'drafts', label: 'Drafts'},
    { id: 'archived', label: 'Archived' }
];

const Products: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const products = useSelector(userProductsSelect.products);
    const navigate = useNavigate();

    return (
        <div className="products-container">
            <div className="products-header">
                <h1>Products</h1>
                <div className="products-header-button" onClick={() => navigate("/admin/products/create")}>
                    Add
                </div>
            </div>
            <div className="products-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`products-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="products-search">
                <div className="products-search-bar">
                    <Search/>
                    <input type="text" className="search-bar" placeholder="Search products..."/>
                </div>
                <p>{products.length} products</p>
            </div>
            {products.length === 0 && (
                <div className="product-empty-container">
                    <h2>You haven’t created a product yet</h2>
                    <p>To start selling fast, you need to create your products.</p>
                </div>
            )}
            {products.length !== 0 && (
                <table className="products-table">
                    <thead>
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th>Id</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td><input type="checkbox"/></td>
                            <td>#{product.id}</td>
                            <td><img src={product.images[0]}/></td>
                            <td>{product.name}</td>
                            <td><span className='badge'>active</span></td>
                            <td>{product.price}$</td>
                            <td>{product.stock}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Products;