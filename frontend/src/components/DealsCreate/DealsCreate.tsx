import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import './DealsCreate.css';
import {useSelector} from "react-redux";
import {userProductsSelect} from "../../widgets/admin-products-widget/model/selectors";
import {createDeal} from "../../widgets/admin-deals-create-widget/model/effects";
import {adminStoreSelect} from "../../widgets/admin-store-page-widget/model/selectors";
import {userStoresSelect} from "../../widgets/admin-store-widget/model/selectors";
import {getProductsByStore} from "../../widgets/admin-products-widget/model/effects";

const DealsCreate: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const storeId = useSelector(adminStoreSelect.id);
    const userProducts = useSelector(userProductsSelect.products);
    const [products, setProducts] = useState(userProducts);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
    const [category, setCategory] = useState<string>('');
    const [store, setStore] = useState<string>(storeId);
    const stores = useSelector(userStoresSelect.stores);
    const [code, setCode] = useState<string | undefined>();
    const [name, setName] = useState('');
    const [percentage, setPercentage] = useState(0);
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async () => {
        await createDeal(
            name,
            percentage,
            code,
            category,
            endDate,
            store,
            selectedProductIds,
            accessToken
        );
        navigate("/admin/deals");
    };

    const changeStore = async (id: string) => {
        setStore(id);
        const productz = await getProductsByStore(id, accessToken);
        setProducts(productz);
    }

    return (
        <div className="sales-create-container">
            <div className="sales-create-header">
                <h1>Deals:create</h1>
                <div className="sales-create-header-button" onClick={() => navigate('/admin/deals')}>
                    Back
                </div>
            </div>

            <div className="sales-create-info-container">
                <div className="sales-create-info">
                    <h1>Sale Info</h1>
                    <p>Define the name, discount percentage, and expiry date of your sale. </p>
                </div>

                <div className="sales-create-selector">
                    <h1>Sale Name</h1>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="sales-create-selector">
                    <h1>Code (required only if a coupon)</h1>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
                </div>

                <div className="sales-create-selector">
                    <h1>Percentage</h1>
                    <input type="number" value={percentage} onChange={(e) => setPercentage(+e.target.value)}/>
                </div>

                <div className="sales-create-selector">
                    <h1>End Date</h1>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                </div>
            </div>

            <div className="sales-create-info-container">
                <div className="sales-create-info">
                    <h1>Select Products</h1>
                    <p>Choose which products or category should be discounted under this sale.</p>
                </div>
                <div className="sales-create-selector">
                    <h1>Store</h1>
                    <select
                        value={store}
                        onChange={(e) => {
                            changeStore(e.target.value);
                        }}
                        className="sales-create-select"
                    >
                        {stores.map((stor) => (
                            <option key={stor.id} value={stor.id}>
                                {stor.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="sales-create-selector">
                    <h1>Products</h1>
                    <select
                        multiple
                        value={selectedProductIds.map(String)}
                        onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, opt => +opt.value);
                            setSelectedProductIds(selected);
                        }}
                        className="sales-create-select"
                        style={{minHeight: "120px"}}
                    >
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="sales-create-selector">
                    <h1>Category</h1>
                    <select
                        multiple
                        onChange={(e) => setCategory(e.target.value)}
                        className="sales-create-select"
                        style={{minHeight: "120px"}}
                    >
                        {['Electronics', 'Fashion', 'Sports'].map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="sales-create-info">
                <div className="sales-create-final-button" onClick={handleSubmit}>
                    Create
                </div>
            </div>
        </div>
    );
}

export default DealsCreate;