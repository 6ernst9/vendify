import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import './DealsCreate.css';
import {useSelector} from "react-redux";
import {userProductsSelect} from "../../widgets/admin-products-widget/model/selectors";
import {createDeal} from "../../widgets/admin-deals-create-widget/model/effects";

const DealsCreate: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const storeId = useSelector(adminSessionSelect.id);
    const products = useSelector(userProductsSelect.products);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
    const [name, setName] = useState('');
    const [percentage, setPercentage] = useState(0);
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async () => {
        await createDeal({
            name,
            percentage,
            endDate,
            productIds: selectedProductIds,
            store: storeId,
            accessToken
        });
        navigate("/admin/deals");
    };

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
                    <p>Define the name, discount percentage, and expiry date of your sale.</p>
                </div>

                <div className="sales-create-selector">
                    <h1>Sale Name</h1>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="sales-create-selector">
                    <h1>Percentage</h1>
                    <input type="number" value={percentage} onChange={(e) => setPercentage(+e.target.value)} />
                </div>

                <div className="sales-create-selector">
                    <h1>End Date</h1>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>

            <div className="sales-create-info-container">
                <div className="sales-create-info">
                    <h1>Select Products</h1>
                    <p>Choose which products should be discounted under this sale.</p>
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
                        style={{ minHeight: "120px" }}
                    >
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
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