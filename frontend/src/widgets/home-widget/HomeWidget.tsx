import React from "react";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Sales from "../../components/Sales/Sales";
import './styles.css';
import BestSelling from "../../components/BestSelling/BestSelling";
import NewArrivals from "../../components/NewArrival/NewArrivals";
import Benefits from "../../components/Benefits/Benefits";
import Footer from "../../components/Footer/Footer";

const HomeWidget: React.FC = () => {
    return (
        <div className="home-widget">
            <Header/>
            <Banner/>
            <Sales/>
            <BestSelling/>
            <NewArrivals/>
            <Benefits/>
            <Footer/>
        </div>
    )
}

export default HomeWidget;