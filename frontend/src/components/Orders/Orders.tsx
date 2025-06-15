import React, {useState} from "react";
import './Orders.css';
import {useSelector} from "react-redux";
import {adminOrderSelect} from "../../widgets/admin-orders-widget/model/selectors";
import {formatNumber} from "../../util/numbers";

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'shipped', label: 'Shipped'},
    { id: 'closed', label: 'Closed' }
];

const Orders: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const orders = useSelector(adminOrderSelect.orders);

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
            {orders.length === 0 && (
                <div className="orders-empty-container">
                    <h2>Your store has no orders yet</h2>
                    <p>Once customers place orders, they’ll appear here for you to manage and fulfill.</p>
                </div>
            )}
            {orders.length > 0 && (
                <table className="order-table">
                    <thead>
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td><input type="checkbox"/></td>
                            <td className="order-id">#{order.id}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.customer}</td>
                            <td>{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
                            <td><span className='badge'>{order.status}</span></td>
                            <td className="total">${formatNumber(order.price)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Orders;