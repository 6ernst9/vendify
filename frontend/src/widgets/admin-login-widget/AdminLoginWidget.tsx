import React, {useEffect} from "react";
import AdminLogin from "../../components/AdminLogin/AdminLogin";
import './styles.css';

const AdminLoginWidget: React.FC = () => {
    useEffect(() => {
        document.title = 'Login | Vendify';
    }, []);

    return (
        <div className="admin-login-widget">
            <AdminLogin/>
        </div>
    )
}

export default AdminLoginWidget;