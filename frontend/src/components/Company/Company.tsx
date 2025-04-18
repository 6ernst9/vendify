import React from "react";
import './Company.css';
import {useNavigate} from "react-router-dom";

const Company: React.FC = () => {
    const navigate = useNavigate();
    const stores = 1;

    return (
        <div className="company-container">
            <div className="company-header">
                <h1>Company</h1>
                {/*<div className="company-header-button" onClick={() => navigate("create")}>*/}
                {/*    Create store*/}
                {/*</div>*/}
                <div className="company-configuration-header-button">
                    Edit
                </div>
            </div>
            {/*{stores === 0 && (*/}
            {/*    <div className="company-empty-container">*/}
            {/*        <h2>You haven’t created a store yet</h2>*/}
            {/*        <p>To start selling your products, you need to create your store profile.</p>*/}
            {/*    </div>*/}
            {/*)}*/}
            {stores === 1 && (
                <div className="company-configuration-container">
                    <div className="company-configuration-header">
                        <h1>General configuration</h1>
                    </div>
                    <div className="company-configuration-content">
                        <h1>ID</h1>
                        <p>2323232323d-2323232-32323-232f23b4a</p>
                    </div>
                    <hr className="company-divider"/>
                    <div className="company-configuration-content">
                        <h1>Name</h1>
                        <p>Exclusive</p>
                    </div>
                    <hr className="company-divider"/>
                    <div className="company-configuration-content">
                        <h1>Path</h1>
                        <p className="highlighted-text">/exclusive</p>
                    </div>
                    <hr className="company-divider"/>
                    <div className="company-configuration-content">
                        <h1>Colors</h1>
                        <div className="company-configuration-colors">
                            <div className="company-configuration-color">
                                #e45g39
                            </div>
                            <div className="company-configuration-color">
                                #f34kl1
                            </div>
                            <div className="company-configuration-color">
                                #71ab33
                            </div>
                            <div className="company-configuration-color">
                                #09ja89
                            </div>
                        </div>
                    </div>
                    <hr className="company-divider"/>
                    <div className="company-configuration-content">
                        <h1>Email</h1>
                        <p>exclusive-support@gmail.com</p>
                    </div>
                    <hr className="company-divider"/>
                    <div className="company-configuration-content">
                        <h1>Phone</h1>
                        <p>+4074838393922</p>
                    </div>
                    <hr className="company-divider"/>
                    <div className="company-configuration-content">
                        <h1>Instagram</h1>
                        <p className="highlighted-text">@exclusive.ro</p>
                    </div>
                    <hr className="company-divider"/>
                    <div className="company-configuration-content">
                        <h1>Twitter</h1>
                        <p></p>
                    </div>
                    <hr className="company-divider"/>
                    <div className="company-configuration-content">
                        <h1>Facebook</h1>
                        <p className="highlighted-text">@Exclusive Resell</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Company;