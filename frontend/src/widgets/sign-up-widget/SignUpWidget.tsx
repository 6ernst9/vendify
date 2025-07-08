import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SignUp from "../../components/SignUp/SignUp";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useNavigate} from "react-router-dom";
import {storeSelect} from "../../redux/core/store/selectors";
import {authSelect} from "../admin-login-widget/model/selectors";

const SignUpWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);
    const isLogged = useSelector(authSelect.isLogged);
    const navigate = useNavigate();
    const store = useSelector(storeSelect.path);

    useEffect(() => {
        document.title = `Sign Up | ${name}`;
    }, [name]);

    useEffect(() => {
        if (isLogged) {
            navigate(`/${store}/home`);
        }
    }, [isLogged]);

    return (
        <div className="sign-up-widget">
            <Header/>
            <SignUp/>
            <Footer/>
        </div>
    )
}

export default SignUpWidget;