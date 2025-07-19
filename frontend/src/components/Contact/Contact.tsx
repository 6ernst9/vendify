import React from "react";
import {ReactComponent as Mail} from '../../assets/icons/mail.svg';
import {ReactComponent as Phone} from '../../assets/icons/phone.svg';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact-container">
            <h2 className="contact-category">Home / Contact</h2>
            <div className="contact-table">
                <div className="contact-details">
                    <div className="contact-call">
                        <div className="contact-call-header">
                            <div className="contact-icon">
                                <Phone/>
                            </div>
                            <h2>Call Us</h2>
                        </div>
                        <p>We are available 24/7, 7 days a week.</p>
                        <p>Phone: +0736666666</p>
                    </div>
                    <div className="contact-write">
                        <div className="contact-write-header">
                            <div className="contact-icon">
                                <Mail/>
                            </div>
                            <h2>Write To Us</h2>
                        </div>
                        <p>Fill out our form and we will contact you within 24 hours.</p>
                        <p>Email: customer@exclusive.com</p>
                        <p>Email: support@exclusive.com</p>
                    </div>
                </div>
                <div className="contact-form">
                    <div className="contact-form-header">
                        <input type="text" placeholder="Your Name"/>
                        <input type="text" placeholder="Your Email"/>
                        <input type="text" placeholder="Your Phone"/>
                    </div>
                    <textarea placeholder="Your Message" className="contact-message-form"/>
                    <div className="contact-send-message">
                        <p>Send Message</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;