import React, { useState } from "react";
import "./OrderInfo.css";
import {useDispatch, useSelector} from "react-redux";
import {formatNumber, formatShortDate} from "../../util/numbers";
import {userOrderSelect} from "../../widgets/order-info-widget/model/selectors";
import {ReactComponent as Star} from "../../assets/icons/star.svg";
import {ReactComponent as EmptyStar} from "../../assets/icons/star-half.svg";
import {getOrder, rateOrder} from "../../widgets/order-info-widget/model/effects";
import {sessionSelect} from "../../redux/core/session/selectors";
import {storeSelect} from "../../redux/core/store/selectors";
import {useNavigate} from "react-router-dom";

const OrderInfo: React.FC = () => {
    const id = useSelector(userOrderSelect.id)
    const createdAt = useSelector(userOrderSelect.createdAt)
    const status = useSelector(userOrderSelect.status)
    const price = useSelector(userOrderSelect.price)
    const address = useSelector(userOrderSelect.address)
    const items = useSelector(userOrderSelect.items)
    const rated = useSelector(userOrderSelect.rated)
    const accessToken = useSelector(sessionSelect.accessToken);
    const store = useSelector(storeSelect.path);
    const storeId = useSelector(storeSelect.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ratings, setRatings] = useState<Record<number, number>>({});

    const handleRate = (productId: number, value: number) => {
        setRatings({ ...ratings, [productId]: value });
    };

    const handleSubmit = async () => {
        const ratingArray = Object.entries(ratings).map(([productId, score]) => ({
            productId: Number(productId),
            score,
        }));

        await rateOrder(ratingArray, accessToken, id);
        await getOrder(id, storeId, accessToken, dispatch)
    };

    return (
        <div className="user-order-container">
            <h1 className="user-order-title">Home / Orders / #{id}</h1>

            <div className="user-order-info">
                <div>
                    <h3>Status</h3>
                    <p>{status}</p>
                </div>
                <div>
                    <h3>Date</h3>
                    <p>{formatShortDate(createdAt)}</p>
                </div>
                <div>
                    <h3>Total</h3>
                    <p>{formatNumber(price)}$</p>
                </div>
            </div>

            <div className="user-order-section">
                <h2>Shipping Address</h2>
                <p>{address.street}, {address.apartment}</p>
                <p>{address.city}, {address.zipCode}</p>
                <p>{address.phoneNumber}</p>
            </div>

            <div className="user-order-section">
                <h2>Products</h2>
                {items.map(item => (
                    <div className="user-order-product" key={item.id}>
                        <img src={item.images[0]} alt={item.name}/>
                        <div className="user-order-product-details">
                            <h3 onClick={() => navigate(`/${store}/product/${item.id}`)}>{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            {!rated && <div className="user-order-stars">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <span
                                        key={val}
                                        className={val <= (ratings[item.id] || 0) ? "filled" : ""}
                                        onClick={() => handleRate(item.id, val)}
                                    >{val <= (ratings[item.id] || 0) ? <Star/> : <EmptyStar/>}</span>
                                ))}
                            </div>}
                        </div>
                    </div>
                ))}
            </div>
            {!rated && <button className="rate-btn" onClick={handleSubmit} >Rate Order</button>}
        </div>
    );
};

export default OrderInfo;
