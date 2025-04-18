import React from "react";
import './CompanyCreate.css';
import {useNavigate} from "react-router-dom";

const CompanyCreate: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="company-create-container">
            <div className="company-create-header">
                <h1>Company:create</h1>
                <div className="company-create-header-button" onClick={() => navigate('/admin/company')}>
                    Back
                </div>
            </div>
            <hr className="company-create-divider"/>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Store Info</h1>
                    <p>Define the basic details of your store, including its name and public URL path. This information
                        helps identify your store across the platform and will be visible to your customers.</p>
                </div>
                <div className="company-create-selector">
                    <h1>Company Name</h1>
                    <input type="text"/>
                </div>
                <div className="company-create-selector">
                    <h1>Path</h1>
                    <input type="text"/>
                </div>
            </div>
            <hr className="company-create-divider"/>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Branding</h1>
                    <p>Customize your store's visual identity by uploading a logo and banner image. These assets will be
                        displayed on your storefront and help reinforce your brand’s presence.</p>
                </div>
                <div className="company-create-selector">
                    <h1>Logo</h1>
                    <div className="company-create-header-button">
                        Upload
                    </div>
                </div>
                <div className="company-create-selector">
                    <h1>Banner</h1>
                    <div className="company-create-header-button">
                        Upload
                    </div>
                </div>
            </div>
            <hr className="company-create-divider"/>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Theme</h1>
                    <p>Personalize your store’s look and feel by selecting the colors. These settings define the visual
                        style of your storefront and create a consistent brand experience.</p>
                </div>
                <div className="company-create-color">
                    <input type="color"/>
                    <p>Primary Color</p>
                </div>
                <div className="company-create-color">
                    <input type="color"/>
                    <p>Secondary Color</p>
                </div>
                <div className="company-create-color">
                    <input type="color"/>
                    <p>Light Color</p>
                </div>
                <div className="company-create-color">
                    <input type="color"/>
                    <p>Dark Color</p>
                </div>
            </div>
            <hr className="company-create-divider"/>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Contact Links</h1>
                    <p>Provide your store’s communication channels so customers can reach out. Include an email, phone
                        number, and any relevant social media links.</p>
                </div>
                <div className="company-create-selector">
                    <h1>Email</h1>
                    <input type="text"/>
                </div>
                <div className="company-create-selector">
                    <h1>Phone</h1>
                    <input type="text"/>
                </div>
                <div className="company-create-selector">
                    <h1>Facebook</h1>
                    <input type="text"/>
                </div>
                <div className="company-create-selector">
                    <h1>Twitter</h1>
                    <input type="text"/>
                </div>
                <div className="company-create-selector">
                    <h1>Instagram</h1>
                    <input type="text"/>
                </div>
            </div>
            <hr className="company-create-divider"/>
            <div className="company-create-info">
                <div className="company-create-final-button" onClick={() => navigate('/admin/company')}>
                    Create
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;