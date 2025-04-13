import React from "react";
import './Company.css';
import {useNavigate} from "react-router-dom";

const Company: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="company-container">
            <div className="company-header">
                <h1>Company</h1>
                <div className="company-header-button" onClick={() => navigate("create")}>
                    Create store
                </div>
            </div>
            <div className="company-empty-container">
                <h2>You haven’t created a store yet</h2>
                <p>To start selling your products, you need to create your store profile.</p>
            </div>
        </div>
    )
}

export default Company;