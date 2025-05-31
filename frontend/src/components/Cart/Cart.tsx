import React, {useEffect, useState} from "react";
import "./Cart.css";
import {getCart, updateCart} from "../../widgets/cart-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {Cart} from "../../widgets/cart-widget/model/types";
import {storeSelect} from "../../redux/core/store/selectors";
import {useNavigate} from "react-router-dom";
import {cartSelect} from "../../widgets/cart-widget/model/selectors";

const CartComponent: React.FC = () => {
    const [coupon, setCoupon] = useState("");
    const accessToken = useSelector(sessionSelect.accessToken);
    const storeId = useSelector(storeSelect.id);
    const store = useSelector(storeSelect.path);
    const id = useSelector(sessionSelect.id);
    const cartItems = useSelector(cartSelect.cartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getCart({customerId: id, accessToken, dispatch});
    }, [accessToken, id]);

    const handleQuantityChange = (cartItem: Cart, newQuantity: number) => {
        updateCart({storeId: storeId, quantity: newQuantity, productId: cartItem.productId, customerId: id, dispatch, accessToken});
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
                                    <img src={item.img} className="cart-product-image"/>
                                    <div className="cart-product-name">{item.name}</div>
                                </div>
                                <div className="cart-price">${item.price}</div>
                                <div className="cart-quantity">
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item, Number(e.target.value))}
                                        className="cart-quantity-select"
                                    >
                                        {[0, 1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="cart-subtotal">${item.price * item.quantity}</div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-actions">
                        <div className="cart-return-shop">Return To Shop</div>
                        <div className="cart-update-cart">Update Cart</div>
                    </div>
                    <div className="cart-final">
                        <div className="cart-coupon-section">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="cart-coupon-input"
                            />
                            <div className="cart-apply-coupon">Apply Coupon</div>
                        </div>

                        <div className="cart-summary">
                            <h3>Cart Total</h3>
                            <div className="cart-summary-item">
                                <div className="cart-summary-label">Subtotal:</div>
                                <div className="cart-summary-value">${subtotal}</div>
                            </div>
                            <div className="cart-summary-item">
                                <div className="cart-summary-label">Shipping:</div>
                                <div className="cart-summary-value">Free</div>
                            </div>
                            <div className="cart-summary-item">
                                <div className="cart-summary-label">Total:</div>
                                <div className="cart-summary-value">${subtotal}</div>
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
