import React from "react";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Sales from "../../components/Sales/Sales";
import './styles.css';

const HomeWidget: React.FC = () => {
    return (
        <div className="home-widget">
            <Header/>
            <Banner/>
            <Sales/>
        </div>
    )
}

export default HomeWidget;