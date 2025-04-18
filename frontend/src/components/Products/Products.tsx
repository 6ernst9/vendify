import React, {useState} from "react";
import './Products.css';
import {ReactComponent as Search} from "../../assets/icons/search.svg";
import image from '../../assets/img/img.png';

const products = [
    { id: 101, name: "Wireless Headphones", status: "active", price: 79.99, stock: 25 },
    { id: 102, name: "Smartphone Case", status: "active", price: 14.99, stock: 120 },
    { id: 103, name: "Gaming Mouse", status: "out of order", price: 49.99, stock: 0 },
    { id: 104, name: "Mechanical Keyboard", status: "active", price: 89.99, stock: 15 },
    { id: 105, name: "Bluetooth Speaker", status: "active", price: 59.99, stock: 40 },
    { id: 106, name: "USB-C Hub", status: "out of order", price: 29.99, stock: 0 },
    { id: 107, name: "4K Monitor", status: "active", price: 299.99, stock: 7 },
    { id: 108, name: "Laptop Stand", status: "active", price: 39.99, stock: 33 },
    { id: 109, name: "Portable Charger", status: "active", price: 24.99, stock: 50 },
    { id: 110, name: "Ergonomic Office Chair", status: "out of order", price: 199.99, stock: 0 }
];

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'drafts', label: 'Drafts'},
    { id: 'archived', label: 'Archived' }
];

const Products: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="products-container">
            <div className="products-header">
                <h1>Products</h1>
                <div className="products-header-button">
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
                <p>213 products</p>
            </div>
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
                        <td><img src={image}/></td>
                        <td>{product.name}</td>
                        <td><span className='badge'>{product.status}</span></td>
                        <td>{product.price}$</td>
                        <td>{product.stock}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products;