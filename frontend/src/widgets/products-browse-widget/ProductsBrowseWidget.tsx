import React, {useEffect} from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import './styles.css';
import BrowseProducts from "../../components/BrowseProducts/BrowseProducts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const ProductsBrowseWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);

    useEffect(() => {
        document.title = `Browse | ${name}`;
    }, [name]);

    return (
        <div className="browse-widget">
            <Header/>
            <BrowseProducts/>
            <Footer/>
        </div>
    )
}

export default ProductsBrowseWidget;