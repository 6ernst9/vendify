import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Sales from "../../components/Sales/Sales";
import './styles.css';
import BestSelling from "../../components/BestSelling/BestSelling";
import NewArrivals from "../../components/NewArrival/NewArrivals";
import Benefits from "../../components/Benefits/Benefits";
import Footer from "../../components/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {storeSelect} from "../../redux/core/store/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {getBestSellingProducts, getDiscountedProducts, getNewestProducts} from "./model/effects";

const HomeWidget: React.FC = () => {
    const name = useSelector(storeSelect.name);
    const id = useSelector(storeSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `Home | ${name}`;
    }, [name]);

    useEffect(() => {
        getDiscountedProducts(id, accessToken, dispatch);
        getNewestProducts(id, accessToken, dispatch);
        getBestSellingProducts(id, accessToken, dispatch);
    }, [accessToken, id]);

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