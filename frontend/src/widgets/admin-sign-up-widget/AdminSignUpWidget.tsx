import React, {useEffect} from "react";
import './styles.css';
import AdminSignUp from "../../components/AdminSignUp/AdminSignUp";
import {useSelector} from "react-redux";
import {authSelect} from "../admin-login-widget/model/selectors";
import {useNavigate} from "react-router-dom";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";

const AdminSignUpWidget: React.FC = () => {
    const navigate = useNavigate();

    const sessionExists = useSelector(adminSessionSelect.exists);
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