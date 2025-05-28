import React, {useEffect} from "react";
import AdminLogin from "../../components/AdminLogin/AdminLogin";
import './styles.css';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authSelect} from "./model/selectors";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";

const AdminLoginWidget: React.FC = () => {
    const sessionExists = useSelector(adminSessionSelect.exists);
    const isLogged = useSelector(authSelect.isLogged);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Login | Vendify';
    }, []);

    useEffect(() => {
        if (isLogged || sessionExists) {
            navigate('/admin/home');
        }
    }, [isLogged, sessionExists]);

    return (
        <div className="admin-login-widget">
            <AdminLogin/>
        </div>
    )
}

export default AdminLoginWidget;