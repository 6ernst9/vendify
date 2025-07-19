import React, {useEffect, useState} from "react";
import "./Cart.css";
import {getCart, updateCart} from "../../widgets/cart-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {storeSelect} from "../../redux/core/store/selectors";
import {useNavigate} from "react-router-dom";
import {cartSelect} from "../../widgets/cart-widget/model/selectors";
import {formatNumber} from "../../util/numbers";

const CartComponent: React.FC = () => {
    const [coupon, setCoupon] = useState("");
    const accessToken = useSelector(sessionSelect.accessToken);
    const storeId = useSelector(storeSelect.id);
    const store = useSelector(storeSelect.path);
    const id = useSelector(sessionSelect.id);
    const cartItems = useSelector(cartSelect.cartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pendingQuantities, setPendingQuantities] = useState<Record<number, number>>({});

    useEffect(() => {
        getCart(id, storeId, accessToken, dispatch);
    }, [accessToken, id, storeId]);

    const handleUpdateCart = () => {
        Object.entries(pendingQuantities).forEach(([productId, quantity]) => {
            const item = cartItems.find((i) => i.productId === Number(productId));
            if (item && item.quantity !== quantity) {
                updateCart(
                    storeId,
                    item.productId,
                    id,
                    quantity,
                    dispatch,
                    accessToken,
                );
            }
        });
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2 className="cart-category">Home / Cart</h2>
            {cartItems.length === 0 ? (
                <div className="cart-empty-message">
                    <h2>Your cart is currently empty</h2>
                    <p>Browse our products and add items to your cart to see them here.</p>
                    <button onClick={() => navigate(`/${store}/browse`)} className="browse-btn">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-table">
                        <div className="cart-header">
                            <div className="cart-header-item">Product</div>
                            <div className="cart-header-item">Price</div>
                            <div className="cart-header-item">Quantity</div>
                            <div className="cart-header-item">Subtotal</div>
                        </div>

                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-product">
                                    <img onClick={() => navigate(`/${item}/product/${item.id}`)} src={item.img} className="cart-product-image"/>
                                    <div className="cart-product-name">
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    <p>${formatNumber(item.price)}</p>
                                </div>
                                <div className="cart-quantity">
                                    <select
                                        value={pendingQuantities[item.productId] ?? item.quantity}
                                        onChange={(e) =>
                                            setPendingQuantities((prev) => ({
                                                ...prev,
                                                [item.productId]: Number(e.target.value),
                                            }))
                                        }
                                        className="cart-quantity-select"
                                    >
                                        {[0, 1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="cart-subtotal">
                                    <p>${formatNumber(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-actions">
                        <div className="cart-return-shop" onClick={() => navigate(`/${store}/browse`)}>Return To Shop</div>
                        <div className="cart-update-cart"  onClick={handleUpdateCart}>Update Cart</div>
                    </div>
                    <div className="cart-final">
                        <div className="cart-summary">
                            <h3>Cart Total</h3>
                            <div className="cart-summary-item">
                                <p>Subtotal:</p>
                                <p>${formatNumber(subtotal)}</p>
                            </div>
                            <div className="cart-summary-item">
                                <p>Shipping:</p>
                                <p>Free</p>
                            </div>
                            <div className="cart-summary-item">
                                <p>Total:</p>
                                <p>${formatNumber(subtotal)}</p>
                            </div>
                            <button className="cart-checkout-btn" onClick={() => navigate(`/${store}/checkout`)}>Proceed
                                to checkout
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default CartComponent;
