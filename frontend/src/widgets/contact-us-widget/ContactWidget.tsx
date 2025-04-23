import React, {useEffect} from "react";
import './styles.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

const ContactWidget: React.FC = () => {
    const name = useSelector(storeSelect.name);

    useEffect(() => {
        document.title = `Contact Us | ${name}`;
    }, [name]);

    return (
        <div className="contact-widget">
            <Header/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default ContactWidget;