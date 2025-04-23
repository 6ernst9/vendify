import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NotFound from "../../components/NotFound/NotFound";
import './styles.css'
import {useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";

const NotFoundWidget: React.FC = () => {
    const name = useSelector(storeSelect.name);

    useEffect(() => {
        document.title = `Ups | ${name}`;
    }, [name]);
    return (
        <div className="not-found-widget">
            <Header/>
            <NotFound/>
            <Footer/>
        </div>
    )
}

export default NotFoundWidget;