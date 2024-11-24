import React from "react";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Sales from "../../components/Sales/Sales";
import './styles.css';
import BestSelling from "../../components/BestSelling/BestSelling";

const HomeWidget: React.FC = () => {
    return (
        <div className="home-widget">
            <Header/>
            <Banner/>
            <Sales/>
            <BestSelling/>
        </div>
    )
}

export default HomeWidget;