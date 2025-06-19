import React, {useEffect, useState} from "react";
import './Orders.css';
import {useSelector} from "react-redux";
import {adminOrderSelect} from "../../widgets/admin-orders-widget/model/selectors";
import {formatNumber, formatShortDateWithTime} from "../../util/numbers";
import {useNavigate} from "react-router-dom";
import {Order} from "../../widgets/admin-orders-widget/model/types";

const tabs = [
    { id: 'all', label: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'shipped', label: 'Shipped'},
    { id: 'closed', label: 'Closed' }
];

const Orders: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const orders = useSelector(adminOrderSelect.orders);
    const [itemsFiltered, setItemsFiltered] = useState<Order[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        setItemsFiltered(orders);
    }, [orders]);

    const handleTabChange = (id: string) => {
        setActiveTab(id);
        let result = orders;

        if(id === 'open') {
            result = result.filter(p => p.status?.toUpperCase() === 'PLACED' || p.status?.toUpperCase() === 'PROCESSED');
        } else if(id === 'shipped') {
            result = result.filter(p => p.status?.toUpperCase() === 'SENT');
        } else if(id === 'closed') {
            result = result.filter(p => p.status?.toUpperCase() === 'COMPLETED');
        }

        setItemsFiltered(result);
    }

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
                        onClick={() => handleTabChange(tab.id)}
                        className={`orders-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {itemsFiltered.length === 0 && (
                <div className="orders-empty-container">
                    <h2>Your store has no orders yet</h2>
                    <p>Once customers place orders, they’ll appear here for you to manage and fulfill.</p>
                </div>
            )}
            {itemsFiltered.length > 0 && (
                <table className="order-table">
                    <thead>
                    <tr>
                        <th>Order No.</th>
                        <th>Date created</th>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemsFiltered.map((order) => (
                        <tr key={order.id}>
                            <td className="order-id" onClick={() => navigate(`/admin/orders/${order.id}`)}>#{order.id}</td>
                            <td>{formatShortDateWithTime(order.createdAt)}</td>
                            <td>{order.customer}</td>
                            <td>{order.items.reduce((total, item) => total + item.quantity, 0)} item{order.items.length > 1 ? 's' : ''}</td>
                            <td><span className='badge'>{order.status}</span></td>
                            <td className="total">{formatNumber(order.price)}$</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Orders;