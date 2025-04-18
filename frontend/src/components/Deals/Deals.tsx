import React, {useState} from "react";
import './Deals.css';

const discounts = [
    { id: 1, name: "Spring Sale", code: "SPRING20", percentage: 20, productsAffected: 12 },
    { id: 2, name: "Holiday Special", code: "HOLIDAY25", percentage: 25, productsAffected: 8 },
    { id: 3, name: "Clearance", code: "CLEAR50", percentage: 50, productsAffected: 5 },
    { id: 4, name: "VIP Discount", code: "VIP15", percentage: 15, productsAffected: 20 },
    { id: 5, name: "New Customer", code: "WELCOME10", percentage: 10, productsAffected: 30 },
    { id: 6, name: "Summer Blowout", code: "SUMMER30", percentage: 30, productsAffected: 7 },
    { id: 7, name: "Back to School", code: "SCHOOL10", percentage: 10, productsAffected: 18 },
    { id: 8, name: "Flash Deal", code: "FLASH40", percentage: 40, productsAffected: 3 },
    { id: 9, name: "Weekend Offer", code: "WEEKEND5", percentage: 5, productsAffected: 50 },
    { id: 10, name: "Limited Time", code: "LIMITED35", percentage: 35, productsAffected: 4 }
];

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'schedules', label: 'Scheduled'},
    { id: 'expired', label: 'Expired' }
];

const Deals: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className='deals-container'>
            <div className='deals-header'>
                <h1>Deals</h1>
                <div className="products-header-button">
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
                    <th><input type="checkbox"/></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Percentage</th>
                    <th>No. products</th>
                </tr>
                </thead>
                <tbody>
                {discounts.map((discount) => (
                    <tr key={discount.id}>
                        <td><input type="checkbox"/></td>
                        <td>#{discount.id}</td>
                        <td>{discount.name}</td>
                        <td>{discount.code}</td>
                        <td>{discount.percentage}$</td>
                        <td>{discount.productsAffected}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Deals;