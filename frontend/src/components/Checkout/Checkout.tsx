import React, {useEffect, useState} from "react";
import "./Checkout.css";
import {getCoupon, placeOrder} from "../../widgets/checkout-widget/model/effects";
import {useDispatch, useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {storeSelect} from "../../redux/core/store/selectors";
import {useNavigate} from "react-router-dom";
import {formatNumber} from "../../util/numbers";
import {Deal} from "../../widgets/admin-deals-create-widget/model/types";
import {cartSelect} from "../../widgets/cart-widget/model/selectors";
import {getCart} from "../../widgets/cart-widget/model/effects";

const Checkout: React.FC = () => {
    const accessToken = useSelector(sessionSelect.accessToken);
    const storeId = useSelector(storeSelect.id);
    const store = useSelector(storeSelect.path);
    const id = useSelector(sessionSelect.id);
    const cartItems = useSelector(cartSelect.cartItems);
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("cash");

    const [firstName, setFirstName] = useState('');
    const [error, setError] = useState('');
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState<undefined | string>();
    const [couponMesage, setCouponMesage] = useState<undefined | string>();
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
            setCouponMesage(coupon.name + ' coupon');
        } else {
            setCouponMesage('Invalid coupon');
        }
    }

    useEffect(() => {
        getCart(id, storeId, accessToken, dispatch);
    }, [accessToken, id, storeId]);

    const initialSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [subtotal, setSubtotal] = useState(initialSubtotal);

    const removeCoupon = async () => {
        setCoupon(undefined);
        setCouponCode('');
        setSubtotal(initialSubtotal);
        setCouponMesage(undefined);
    }

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
    const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value);
    const handleApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => setApartment(e.target.value);
    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value);
    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => setZip(e.target.value);
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
    const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => setCouponCode(e.target.value);

    const handlePlaceOrder = async () => {
        if(firstName !== '' && street !== '' && city !== '' && zip !== '' && phone !== '' ) {
            placeOrder(id, storeId, couponCode || '', subtotal, {street, city, apartment, phoneNumber: phone, zipCode: zip}, accessToken)
                .then(() => navigate(`/${store}`))
        } else {
            setError('Fields cannot be empty');
        }
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
                    {error && error !== '' && <p className="checkout-error">{error}</p>}
                </form>
            </div>

            <div className="checkout-summary">
                {cartItems.map((cartItem) =>
                    <div className="cart-item">
                        <img onClick={() => navigate(`/${store}/product/${cartItem.id}`)} src={cartItem.img} alt={cartItem.name}/>
                        <span>{cartItem.quantity} x {cartItem.name}</span>
                        <strong>${formatNumber(cartItem.price)}</strong>
                    </div>
                )}
                <hr/>
                <div className="summary-row">Subtotal: <span>{formatNumber(initialSubtotal)}$</span></div>
                <div className="summary-row">Shipping: <span>Free</span></div>
                {coupon && (<div className="summary-row">Coupon: <span>-{formatNumber(initialSubtotal - subtotal)}$</span></div>)}
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
                {couponCode && <p className="coupon-message">{couponMesage}</p> }

                <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
};

export default Checkout;
