import React, {useState} from "react";
import './Orders.css';

const orders = [
    { id: '#1165', date: 'Oct 5, 4:54pm EST', customer: 'Alek Crona', payment: 'Pending', fulfillment: 'Fulfilled', total: '$2,711.00' },
    { id: '#1164', date: 'Oct 5, 4:54pm EST', customer: 'Santos Kuvalis', payment: 'Partially Paid', fulfillment: 'Fulfilled', total: '$3,083.00' },
    { id: '#1163', date: 'Oct 5, 4:54pm EST', customer: 'Sheila Braun', payment: 'Pending', fulfillment: 'Fulfilled', total: '$1,176.00' },
    { id: '#1162', date: 'Oct 5, 4:54pm EST', customer: 'Candice Ankunding', payment: 'Pending', fulfillment: 'Fulfilled', total: '$388.00' },
    { id: '#1161', date: 'Oct 5, 4:54pm EST', customer: 'Eryn Marvin', payment: 'Pending', fulfillment: 'Fulfilled', total: '$3,357.00' },
];

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'shipped', label: 'Shipped'},
    { id: 'closed', label: 'Closed' }
];

const Orders: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h1>Orders</h1>
                <div className="orders-header-button">
                    Export
                </div>
            </div>
            <div className="orders-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`orders-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
        </div>
    <table className="order-table">
        <thead>
        <tr>
            <th><input type="checkbox"/></th>
            <th>Order</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Fulfillment</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td><input type="checkbox"/></td>
                        <td className="order-id">{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.customer}</td>
                        <td><span className='badge'>{order.payment}</span></td>
                        <td><span className='badge'>{order.fulfillment}</span></td>
                        <td className="total">{order.total}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;