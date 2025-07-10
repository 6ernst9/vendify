import React, {useEffect, useState} from "react";
import './Products.css';
import {ReactComponent as Search} from "../../assets/icons/search.svg";
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
    const [productsFiltered, setProducts] = useState(products);
    const navigate = useNavigate();

    useEffect(() => {
        setProducts(products);
    }, [products]);
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result = products;
        const search = e.target.value;
        
        if(search !== undefined && search !== '') {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description?.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        setProducts(result);
    }

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
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search products..."
                        onChange={handleSearch}/>
                </div>
                <p>{productsFiltered.length} products</p>
            </div>
            {productsFiltered.length === 0 && (
                <div className="product-empty-container">
                    <h2>You haven’t created a product yet</h2>
                    <p>To start selling fast, you need to create your products.</p>
                </div>
            )}
            {productsFiltered.length !== 0 && (
                <table className="products-table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsFiltered.map((product) => (
                        <tr key={product.id}>
                            <td className="product-id" onClick={() => navigate(`/admin/products/${product.id}`)}>#{product.id}</td>
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