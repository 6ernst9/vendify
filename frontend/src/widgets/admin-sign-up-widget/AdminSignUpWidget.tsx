import React, {useEffect} from "react";
import './styles.css';
import AdminSignUp from "../../components/AdminSignUp/AdminSignUp";
import {useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";
import {authSelect} from "../admin-login-widget/model/selectors";
import {useNavigate} from "react-router-dom";

const AdminSignUpWidget: React.FC = () => {
    const navigate = useNavigate();

    const sessionExists = useSelector(sessionSelect.exists);
    const isLogged = useSelector(authSelect.isLogged);

    useEffect(() => {
        document.title = 'Sign up | Vendify';
    }, []);

    useEffect(() => {
        if (isLogged || sessionExists) {
            navigate('/admin/home');
        }
    }, [isLogged, sessionExists]);

    return (
        <div className="admin-sign-up-widget">
            <AdminSignUp/>
        </div>
    )
}

export default AdminSignUpWidget;