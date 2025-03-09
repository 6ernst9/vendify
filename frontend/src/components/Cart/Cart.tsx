import React, { useState } from "react";
import {mockCartItems} from '../../widgets/cart-widget/mock/cartItem';
import "./Cart.css";

const Cart: React.FC = () => {
    const [coupon, setCoupon] = useState("");
    const [cartItems, setCartItems] = useState(mockCartItems);

    const handleQuantityChange = (id: number, quantity: number) => {
        if(quantity === 0) {
            setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
        } else {
            setCartItems((prevCart) =>
                prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
            );
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2 className="cart-category">Home / Cart</h2>

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
                            <img src={item.image} className="cart-product-image" />
                            <div className="cart-product-name">{item.name}</div>
                        </div>
                        <div className="cart-price">${item.price}</div>
                        <div className="cart-quantity">
                            <select
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
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
                    <button className="cart-checkout-btn">Proceed to checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
