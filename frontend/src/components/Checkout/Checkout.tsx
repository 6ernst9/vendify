import React, {useEffect, useState} from "react";
import "./Checkout.css";
import {getCart, getCoupon, placeOrder} from "../../widgets/checkout-widget/model/effects";
import {useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {storeSelect} from "../../redux/core/store/selectors";
import {Cart} from "../../widgets/cart-widget/model/types";
import {useNavigate} from "react-router-dom";
import {formatNumber} from "../../util/numbers";
import {Deal} from "../../widgets/admin-deals-create-widget/model/types";

const Checkout: React.FC = () => {
    const accessToken = useSelector(sessionSelect.accessToken);
    const storeId = useSelector(storeSelect.id);
    const store = useSelector(storeSelect.path);
    const id = useSelector(sessionSelect.id);
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    
    const [paymentMethod, setPaymentMethod] = useState("cash");

    const [firstName, setFirstName] = useState('');
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [saveInfo, setSaveInfo] = useState(true);
    const initialSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [subtotal, setSubtotal] = useState(initialSubtotal);
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState<undefined | string>();
    const [coupon, setCoupon] = useState<Deal>();

    const applyCoupon = async () => {
        const coupon = await getCoupon(couponCode || '', storeId, accessToken);

        if (coupon && coupon.productIds && coupon.percentage) {
            setCoupon(coupon);
            const discounted = cartItems.reduce((sum, item) => {
                if (coupon.productIds.includes(item.productId)) {
                    const discountedPrice = item.price * (1 - coupon.percentage / 100);
                    return sum + discountedPrice * item.quantity;
                }
                return sum + item.price * item.quantity;
            }, 0);

            setSubtotal(discounted);
        }
    }

    const removeCoupon = async () => {
       setCoupon(undefined);
       setCouponCode('');
       setSubtotal(initialSubtotal);
    }

    useEffect(() => {
        getCart(id, storeId, accessToken).then((response) => setCartItems(response));
    }, [accessToken, id]);

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
    const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value);
    const handleApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => setApartment(e.target.value);
    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value);
    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => setZip(e.target.value);
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
    const handleSaveInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => setSaveInfo(e.target.checked);
    const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => setCouponCode(e.target.value);

    const handlePlaceOrder = async () => {
        placeOrder(id, storeId, couponCode || '', subtotal, {street, city, apartment, phoneNumber: phone, zipCode: zip}, accessToken)
            .then(() => navigate(`/${store}`))
    }

    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <h2>Home / Checkout</h2>
                <form>
                    <label>
                        Full Name*
                        <input type="text" required value={firstName} onChange={handleFirstNameChange}/>
                    </label>
                    <label>
                        Street Name*
                        <input type="text" required value={street} onChange={handleStreetChange}/>
                    </label>
                    <label>
                        Apartment, floor, etc. (optional)
                        <input type="text" value={apartment} onChange={handleApartmentChange}/>
                    </label>
                    <label>
                        Town/City*
                        <input type="text" required value={city} onChange={handleCityChange}/>
                    </label>
                    <label>
                        Zip Code*
                        <input type="text" required value={zip} onChange={handleZipChange}/>
                    </label>
                    <label>
                        Phone Number*
                        <input type="text" required value={phone} onChange={handlePhoneChange}/>
                    </label>
                    <label className="save-info">
                        <input type="checkbox" checked={saveInfo} onChange={handleSaveInfoChange}/>
                        Save this information for faster check-out next time
                    </label>
                </form>
            </div>

            <div className="checkout-summary">
                {cartItems.map((cartItem) =>
                    <div className="cart-item">
                        <img src={cartItem.img} alt={cartItem.name}/>
                        <span>{cartItem.quantity} x {cartItem.name}</span>
                        <strong>${formatNumber(cartItem.price)}</strong>
                    </div>
                )}
                <hr/>
                <div className="summary-row">Subtotal: <span>{formatNumber(subtotal)}$</span></div>
                <div className="summary-row">Shipping: <span>Free</span></div>
                {coupon && (<div className="summary-row">Coupon: <span>-{formatNumber(initialSubtotal - subtotal)}</span></div>)}
                <hr/>
                <div className="summary-row total">Total: <span>{formatNumber(subtotal)}$</span></div>

                <div className="payment-methods">
                    <label>
                        <input type="radio" name="payment" value="cash"
                               checked={paymentMethod === "cash"}
                               onChange={() => setPaymentMethod("cash")}
                        />
                        Cash on delivery
                    </label>
                    <div className="payment-icons">
                        <img src="https://img.icons8.com/color/48/visa.png" alt="Visa"/>
                        <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard"/>
                        <img src="https://img.icons8.com/color/48/amex.png" alt="Amex"/>
                    </div>
                </div>

                <div className="coupon-row">
                    <input type="text" placeholder="Coupon Code" value={couponCode} onChange={handleCouponChange}/>
                    <button className="apply-btn" onClick={coupon? removeCoupon : applyCoupon}>
                        {coupon? 'Remove Coupon' : 'Apply Coupon'}
                    </button>
                </div>

                <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
};

export default Checkout;
