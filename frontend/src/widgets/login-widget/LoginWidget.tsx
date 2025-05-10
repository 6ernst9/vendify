import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Login from "../../components/Login/Login";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const LoginWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);

    useEffect(() => {
        document.title = `Login | ${name}`;
    }, [name]);

    return (
        <div className="login-widget">
            <Header/>
            <Login/>
            <Footer/>
        </div>
    )
}

export default LoginWidget;