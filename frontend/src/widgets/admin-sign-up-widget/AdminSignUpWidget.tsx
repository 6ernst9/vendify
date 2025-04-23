import React, {useEffect} from "react";
import './styles.css';
import AdminSignUp from "../../components/AdminSignUp/AdminSignUp";

const AdminSignUpWidget: React.FC = () => {
    useEffect(() => {
        document.title = 'Sign up | Vendify';
    }, []);

    return (
        <div className="admin-sign-up-widget">
            <AdminSignUp/>
        </div>
    )
}

export default AdminSignUpWidget;