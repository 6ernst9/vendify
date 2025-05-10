import React, {useEffect} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SignUp from "../../components/SignUp/SignUp";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const SignUpWidget: React.FC = () => {
    const name = useSelector((state: RootState) => state.store.name);

    useEffect(() => {
        document.title = `Sign Up | ${name}`;
    }, [name]);

    return (
        <div className="sign-up-widget">
            <Header/>
            <SignUp/>
            <Footer/>
        </div>
    )
}

export default SignUpWidget;