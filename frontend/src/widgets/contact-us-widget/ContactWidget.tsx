import React, {useEffect} from "react";
import './styles.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {updateActivity} from "../../util/session";

const ContactWidget: React.FC = () => {
    const name = useSelector(storeSelect.name);
    const storeId = useSelector(storeSelect.id);

    useEffect(() => {
        document.title = `Contact Us | ${name}`;
        updateActivity("/contact", "view-contact", storeId);
    }, [name, storeId]);

    return (
        <div className="contact-widget">
            <Header/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default ContactWidget;