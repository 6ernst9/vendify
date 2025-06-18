import React from "react";
import {useNavigate} from "react-router-dom";
import './OrderPage.css';
import {useDispatch, useSelector} from "react-redux";
import {adminOrderSelect} from "../../widgets/admin-order-widget/model/selectors";
import {formatShortDateWithTime} from "../../util/numbers";
import {updateStatus} from "../../widgets/admin-order-widget/model/effects";
import {sessionSelect} from "../../redux/core/session/selectors";

const statuses = [
    'Placed',
    'Processed',
    'Sent',
    'Completed',
    'Returned'
]

const OrderPage: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(sessionSelect.accessToken);
    const dispatch = useDispatch();

    const customerId = useSelector(adminOrderSelect.customerId);
    const id = useSelector(adminOrderSelect.id);
    const createdAt = useSelector(adminOrderSelect.createdAt);
    const store = useSelector(adminOrderSelect.store);
    const status = useSelector(adminOrderSelect.status);
    const price = useSelector(adminOrderSelect.price);
    const items = useSelector(adminOrderSelect.items);

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateStatus({id, status: e.target.value, accessToken, dispatch})
    }

    return (
        <div className="order-page-container">
            <div className="order-page-header">
                <h1>Order:{id}</h1>
                <div className="order-page-header-buttons">
                    <div className="order-page-configuration-header-button">
                        Edit
                    </div>
                </div>
            </div>
            <div className="order-page-configuration-container">
                <div className="order-page-configuration-header">
                    <h1>General configuration</h1>
                </div>
                <div className="order-page-configuration-content">
                    <h1>ID</h1>
                    <p>{id}</p>
                </div>
                <hr className="order-page-divider"/>
                <div className="order-page-configuration-content">
                    <h1>Store</h1>
                    <p>{store}</p>
                </div>
                <hr className="order-page-divider"/>
                <div className="order-page-configuration-content">
                    <h1>Customer ID</h1>
                    <p>{customerId}</p>
                </div>
                <hr className="order-page-divider"/>
                <div className="order-page-configuration-content">
                    <h1>Date created</h1>
                    <p>{formatShortDateWithTime(createdAt)}</p>
                </div>
                <hr className="order-page-divider"/>
                <div className="order-page-configuration-content">
                    <h1>Price</h1>
                    <p>{price}$</p>
                </div>
                <hr className="order-page-divider"/>
                <div className="order-page-configuration-content">
                    <h1>Status</h1>
                    <select className="order-page-select" onChange={handleStatusChange}>
                        {statuses.map((stat) => {
                            return <option selected={stat.toUpperCase() === status} value={stat.toUpperCase()}>{stat}</option>
                        })}
                    </select>
                </div>
                <hr className="order-page-divider"/>
                <div className="order-page-table-content">
                    <h1>Products</h1>
                    <table className="order-page-table">
                        <tbody>
                        {items.map((product) => (
                            <tr key={product.id}>
                                <td>No. #{product.id}</td>
                                <td><img src={product.images[0]}/></td>
                                <td>{product.name}</td>
                                <td>{product.price}$</td>
                                <td>{product.quantity} pieces</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;