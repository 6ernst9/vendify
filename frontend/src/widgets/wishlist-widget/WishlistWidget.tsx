import React, {useEffect} from "react";
import './styles.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Wishlist from "../../components/Wishlist/Wishlist";
import BestSelling from "../../components/BestSelling/BestSelling";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {storeSelect} from "../../redux/core/store/selectors";
import {sessionSelect} from "../../redux/core/session/selectors";
import {getBestSellingProducts} from "../home-widget/model/effects";
import {getWishlist} from "./model/effects";
import {updateActivity} from "../../util/session";

const WishlistWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);
    const id = useSelector(storeSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const customerId = useSelector(sessionSelect.id);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = `Wishlist | ${name}`;
        }, [name]);

    useEffect(() => {
        getBestSellingProducts(id, accessToken, dispatch);
        getWishlist(customerId, id, accessToken, dispatch);
        updateActivity("wishlist", "view-wishlist", id);
    }, [accessToken, customerId, id]);

    return (
        <div className="wishlist-widget">
            <Header/>
            <Wishlist/>
            <BestSelling/>
            <Footer/>
        </div>
    )
}

export default WishlistWidget;