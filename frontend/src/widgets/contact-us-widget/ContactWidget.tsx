import React from "react";
import './styles.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";

const ContactWidget: React.FC = () => {
    return (
        <div className="contact-widget">
            <Header/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default ContactWidget;