import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Login from "../../components/Login/Login";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {authSelect} from "../admin-login-widget/model/selectors";
import {useNavigate} from "react-router-dom";
import {storeSelect} from "../../redux/core/store/selectors";

const LoginWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);
    const isLogged = useSelector(authSelect.isLogged);
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);

    useEffect(() => {
        document.title = `Login | ${name}`;
    }, [name]);

    useEffect(() => {
        if (isLogged) {
            navigate(`/${store}/home`);
        }
    }, [isLogged]);

    return (
        <div className="login-widget">
            <Header/>
            <Login/>
            <Footer/>
        </div>
    )
}

export default LoginWidget;