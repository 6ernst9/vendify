import React from "react";
import './Terms.css';
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

const Terms: React.FC = () => {
    const name = useSelector(storeSelect.name);

    return (
        <div className="privacy-terms-container">
            <h1>Privacy Policy</h1>
            <p>
                At {name}, we value your privacy. We collect only the information necessary to provide our services, such as your name, email, and shipping address. This data is used solely for account management, order processing, and improving your experience on our platform.
            </p>
            <p>
                We do not sell, rent, or share your personal information with third parties, except where required by law or with your explicit consent. Your data is stored securely, and we use encryption protocols to protect all sensitive transactions.
            </p>
            <p>
                You have the right to request access to your data, correct inaccuracies, or delete your account at any time. For any privacy-related concerns, please contact us at <strong>privacy@{name.toLowerCase()}.com</strong>.
            </p>

            <h1>Terms and Conditions</h1>
            <p>
                By using {name}, you agree to our terms of service. Users must provide accurate information when registering, and are responsible for maintaining the confidentiality of their account credentials.
            </p>
            <p>
                Products listed on {name} are managed by individual store owners. {name} is not liable for product quality or delivery delays, although we actively moderate reported violations and offer customer support to resolve disputes.
            </p>
            <p>
                We reserve the right to suspend or terminate accounts that violate our policies, including fraudulent activity, misuse of the platform, or abuse towards staff or sellers.
            </p>
            <p>
                These terms are subject to change. Continued use of {name} after updates constitutes agreement to the revised terms.
            </p>

            <h1>Frequently Asked Questions (FAQ)</h1>

            <div className="faq-section">
                <h2>How do I track my order?</h2>
                <p>
                    Once your order is placed, you will receive a confirmation email with tracking details. You can also view your order status by visiting your account's "Orders" section.
                </p>

                <h2>Can I return a product?</h2>
                <p>
                    Yes, returns are accepted within 14 days of delivery if the product is unused and in original condition.
                </p>

                <h2>How do I apply a discount or coupon code?</h2>
                <p>
                    During checkout, enter your coupon code in the designated field and click “Apply.” The discount will be reflected in your total price if the code is valid.
                </p>

                <h2>How do I contact customer support?</h2>
                <p>
                    For any issues, reach out to our support team at <strong>support@{name.toLowerCase()}.com</strong>. We aim to respond within 24 hours.
                </p>
            </div>
        </div>
    );
};

export default Terms;
