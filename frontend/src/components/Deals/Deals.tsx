import React, {useState} from "react";
import './Deals.css';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {adminDealsSelect} from "../../widgets/admin-deals-widget/model/selectors";

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'coupons', label: 'Coupons'},
    { id: 'expired', label: 'Expired' }
];

const Deals: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();
    const deals = useSelector(adminDealsSelect.sales);

    return (
        <div className='deals-container'>
            <div className='deals-header'>
                <h1>Deals</h1>
                <div className="products-header-button" onClick={() => navigate('/admin/deals/create')}>
                    Add
                </div>
            </div>
            <div className="deals-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`deals-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <table className="deals-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Percentage</th>
                    <th>No. products</th>
                </tr>
                </thead>
                <tbody>
                {deals.map((discount) => (
                    <tr key={discount.id}>
                        <td className="deal-id" onClick={() => navigate(`/admin/deals/${discount.id}`)}>#{discount.id}</td>
                        <td>{discount.name}</td>
                        <td>{discount.code || 'NOT A COUPON'}</td>
                        <td>{discount.percentage}%</td>
                        <td>{discount.productIds.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Deals;