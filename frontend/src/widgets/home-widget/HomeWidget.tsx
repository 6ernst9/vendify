import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Sales from "../../components/Sales/Sales";
import './styles.css';
import BestSelling from "../../components/BestSelling/BestSelling";
import NewArrivals from "../../components/NewArrival/NewArrivals";
import Benefits from "../../components/Benefits/Benefits";
import Footer from "../../components/Footer/Footer";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const HomeWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);

    useEffect(() => {
        document.title = `Home | ${name}`;
    }, [name]);

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