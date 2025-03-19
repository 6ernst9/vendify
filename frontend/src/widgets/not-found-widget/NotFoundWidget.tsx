import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NotFound from "../../components/NotFound/NotFound";
import './styles.css'

const NotFoundWidget: React.FC = () => {
    return (
        <div className="not-found-widget">
            <Header/>
            <NotFound/>
            <Footer/>
        </div>
    )
}

export default NotFoundWidget;