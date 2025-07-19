import React from "react";
import {useNavigate} from "react-router-dom";
import './CompanyPage.css';
import {useSelector} from "react-redux";
import {adminStoreSelect} from "../../widgets/admin-store-page-widget/model/selectors";

const CompanyPage: React.FC = () => {
    const navigate = useNavigate();

    const name = useSelector(adminStoreSelect.name);
    const id = useSelector(adminStoreSelect.id);
    const path = useSelector(adminStoreSelect.path);
    const theme = useSelector(adminStoreSelect.theme);
    const email = useSelector(adminStoreSelect.email);
    const facebook = useSelector(adminStoreSelect.facebook);
    const twitter = useSelector(adminStoreSelect.twitter);
    const instagram = useSelector(adminStoreSelect.instagram);
    const phone = useSelector(adminStoreSelect.phone);

    return (
        <div className="company-page-container">
            <div className="company-page-header">
                <h1>Company:{name}</h1>
                <div className="company-page-header-buttons">
                    <div className="company-page-configuration-header-button" onClick={() => navigate(`/admin/company/edit/${id}`)}>
                        Edit
                    </div>
                    <div className="company-page-header-button" onClick={() => navigate('/admin/company')}>
                        Back
                    </div>
                </div>
            </div>
            <div className="company-page-configuration-container">
                <div className="company-page-configuration-header">
                    <h1>General info</h1>
                </div>
                <div className="company-page-configuration-content">
                    <h1>ID</h1>
                    <p>{id}</p>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Name</h1>
                    <p>{name}</p>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Path</h1>
                    <p className="highlighted-text" onClick={() => navigate(`/${path}`)}>/{path}</p>
                </div>
            </div>
            <div className="company-page-configuration-container">
                <div className="company-page-configuration-header">
                    <h1>Theme configuration</h1>
                </div>
                <div className="company-page-configuration-content">
                    <h1>Primary color</h1>
                    <div className="company-page-configuration-colors">
                        <div className="company-configuration-color"
                             style={{backgroundColor: theme.primaryColor}}/>
                        <p>{theme.primaryColor}</p>
                    </div>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Background color</h1>
                    <div className="company-page-configuration-colors">
                        <div className="company-configuration-color"
                             style={{backgroundColor: theme.backgroundColor}}/>
                        <p>{theme.backgroundColor}</p>
                    </div>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Title color</h1>
                    <div className="company-page-configuration-colors">
                        <div className="company-configuration-color"
                             style={{backgroundColor: theme.titleColor}}/>
                        <p>{theme.titleColor}</p>
                    </div>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Text color</h1>
                    <div className="company-page-configuration-colors">
                        <div className="company-configuration-color" style={{ backgroundColor: theme.textSecondaryColor }}/>
                        <p>{theme.textSecondaryColor}</p>
                    </div>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Navbar style</h1>
                    <div className="company-page-configuration-color">
                        {theme.navbarStyle}
                    </div>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                <h1>Button roundness</h1>
                    <p>{theme.buttonRadius}</p>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Card roundness</h1>
                    <p>{theme.cardRadius}</p>
                </div>
            </div>
            <div className="company-page-configuration-container">
                <div className="company-page-configuration-header">
                    <h1>Contact links</h1>
                </div>
                <div className="company-page-configuration-content">
                    <h1>Email</h1>
                    <p>{email}</p>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Phone</h1>
                    <p>{phone}</p>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Instagram</h1>
                    <p className="highlighted-text">{instagram}</p>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Twitter</h1>
                    <p>{twitter}</p>
                </div>
                <hr className="company-page-divider"/>
                <div className="company-page-configuration-content">
                    <h1>Facebook</h1>
                    <p className="highlighted-text">{facebook}</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyPage;