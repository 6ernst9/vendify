import React, {useState} from "react";
import './CompanyCreate.css';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {uploadImageToFirebase} from "../../util/upload";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {adminStoreSelect} from "../../widgets/admin-store-page-widget/model/selectors";
import {deleteStore, updateStore} from "../../widgets/admin-edit-store/model/effects";

const CompanyEdit: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const id = useSelector(adminSessionSelect.id);

    const initialName = useSelector(adminStoreSelect.name);
    const storeId = useSelector(adminStoreSelect.id);
    const initialPath = useSelector(adminStoreSelect.path);
    const initialTheme = useSelector(adminStoreSelect.theme);
    const initialLogo = useSelector(adminStoreSelect.logo);
    const initialBanner = useSelector(adminStoreSelect.banner);
    const initialEmail = useSelector(adminStoreSelect.email);
    const initialFacebook = useSelector(adminStoreSelect.facebook);
    const initialTwitter = useSelector(adminStoreSelect.twitter);
    const initialInstagram = useSelector(adminStoreSelect.instagram);
    const initialPhone = useSelector(adminStoreSelect.phone);

    const [error, setError] = useState('');

    const [name, setStoreName] = useState(initialName);
    const [path, setStorePath] = useState(initialPath);

    const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setStoreName(e.target.value);
    const handleStorePathChange = (e: React.ChangeEvent<HTMLInputElement>) => setStorePath(e.target.value);

    const [logo, setLogo] = useState<string>(initialLogo);
    const [banner, setBanner] = useState<string>(initialBanner);

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = await uploadImageToFirebase(file, 'logos');
        setLogo(url);
    };

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = await uploadImageToFirebase(file, 'banners');
        setBanner(url);
    };

    const [primaryColor, setPrimaryColor] = useState(initialTheme.primaryColor);
    const [backgroundColor, setBackgroundColor] = useState(initialTheme.backgroundColor);
    const [titleColor, setTitleColor] = useState(initialTheme.titleColor);
    const [textSecondaryColor, setTextSecondaryColor] = useState(initialTheme.textSecondaryColor);
    const [font, setFont] = useState(initialTheme.font);
    const [buttonRadius, setButtonRadius] = useState(parseInt(initialTheme.buttonRadius));
    const [cardRadius, setCardRadius] = useState(parseInt(initialTheme.cardRadius));
    const [navbarStyle, setNavbarStyle] = useState<'solid' | 'blur'>(initialTheme.navbarStyle);

    const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrimaryColor(e.target.value);
    const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(e.target.value);
    const handleTitleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleColor(e.target.value);
    const handleTextSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setTextSecondaryColor(e.target.value);
    const handleFontChange = (e: React.ChangeEvent<HTMLInputElement>) => setFont(e.target.value);
    const handleButtonRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => setButtonRadius(Number(e.target.value));
    const handleCardRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardRadius(Number(e.target.value));
    const handleNavbarStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setNavbarStyle(e.target.value as 'solid' | 'blur');

    const [email, setEmail] = useState(initialEmail);
    const [phone, setPhone] = useState(initialPhone);
    const [facebook, setFacebook] = useState(initialFacebook);
    const [twitter, setTwitter] = useState(initialTwitter);
    const [instagram, setInstagram] = useState(initialInstagram);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
    const handleFacebookChange = (e: React.ChangeEvent<HTMLInputElement>) => setFacebook(e.target.value);
    const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => setTwitter(e.target.value);
    const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => setInstagram(e.target.value);

    const handleSubmit = async () => {
        if(name !== '' && path !== '') {
            await updateStore(
                storeId,
                name,
                id,
                path,
                {
                    primaryColor,
                    titleColor,
                    backgroundColor,
                    textSecondaryColor,
                    font,
                    buttonRadius: buttonRadius.toString() + 'px',
                    cardRadius: cardRadius.toString() + 'px',
                    navbarStyle
                },
                banner,
                logo,
                {
                    email, phone, instagram, facebook, twitter
                },
                accessToken
            );
            navigate("/admin/home");
        } else {
            setError('Fields cannot be empty');
        }
    }

    const handleDeleteStore = async () => {
        await deleteStore(storeId, accessToken);
        navigate('/admin/company');
    }

    return (
        <div className="company-create-container">
            <div className="company-create-header">
                <h1>Company:edit</h1>
                <div className="company-page-header-buttons">
                    <div className="company-page-configuration-delete-button"
                         onClick={handleDeleteStore}>
                        Delete
                    </div>
                    <div className="company-page-header-button" onClick={() => navigate(`/admin/company/${storeId}`)}>
                        Back
                    </div>
                </div>
            </div>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Store Info</h1>
                </div>
                <div className="company-create-selector">
                    <h1>Company ID</h1>
                    <input
                        type="text"
                        value={id}/>
                </div>
                <div className="company-create-selector">
                    <h1>Company Name</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={handleStoreNameChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Path</h1>
                    <input
                        type="text"
                        value={path}
                        onChange={handleStorePathChange}/>
                </div>
            </div>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Branding</h1>
                </div>
                <div className="company-create-selector">
                    <h1>Logo</h1>
                    <input
                        type="file"
                        id="logo-upload"
                        style={{ display: 'none' }}
                        onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload" className="company-create-header-button">
                        Upload
                    </label>
                    {logo && <p className="company-create-file-name">{logo.split('/').pop()?.split('?')[0]}</p>}

                </div>
                <div className="company-create-selector">
                    <h1>Banner</h1>
                    <input
                        type="file"
                        id="banner-upload"
                        style={{ display: 'none' }}
                        onChange={handleBannerUpload}
                    />
                    <label htmlFor="banner-upload" className="company-create-header-button">
                        Upload
                    </label>

                    {banner && <p className="company-create-file-name">{banner.split('/').pop()?.split('?')[0]}</p>}

                </div>
            </div>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Theme</h1>
                </div>
                <div className="company-create-color">
                    <input
                        type="color"
                        value={primaryColor}
                        onChange={handlePrimaryColorChange}/>
                    <p>Primary Color</p>
                </div>
                <div className="company-create-color">
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={handleBackgroundColorChange}/>
                    <p>Background Color</p>
                </div>
                <div className="company-create-color">
                    <input
                        type="color"
                        onChange={handleTitleColorChange}
                        value={titleColor}
                    />
                    <p>Text Color</p>
                </div>
                <div className="company-create-color">
                    <input
                        type="color"
                        onChange={handleTextSecondaryColorChange}
                        value={textSecondaryColor}/>
                    <p>Secondary Text Color</p>
                </div>
                <div className="company-create-selector">
                    <h1>Font Family</h1>
                    <input
                        type="text"
                        value={font}
                        onChange={handleFontChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Button Roundness: {buttonRadius}px</h1>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={buttonRadius}
                        onChange={handleButtonRadiusChange}
                        className="company-create-slider"
                    />
                </div>

                <div className="company-create-selector">
                    <h1>Cards Roundness: {cardRadius}px</h1>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={cardRadius}
                        onChange={handleCardRadiusChange}
                        className="company-create-slider"
                    />
                </div>

                <div className="company-create-selector">
                    <h1>Navbar Style</h1>
                    <select className="company-create-select" onChange={handleNavbarStyleChange}>
                        <option selected={navbarStyle === 'solid'} value="solid">Solid</option>
                        <option selected={navbarStyle === 'blur'} value="blur">Blur</option>
                    </select>
                </div>

            </div>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Contact Links</h1>
                </div>
                <div className="company-create-selector">
                    <h1>Email</h1>
                    <input
                        type="text"
                        value={email}
                        onChange={handleEmailChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Phone</h1>
                    <input type="text" value={phone} onChange={handlePhoneChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Facebook</h1>
                    <input type="text" value={facebook} onChange={handleFacebookChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Twitter</h1>
                    <input type="text" value={twitter} onChange={handleTwitterChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Instagram</h1>
                    <input type="text" value={instagram} onChange={handleInstagramChange}/>
                </div>
            </div>
            <div className="company-create-info">
                <div className="company-create-final-button" onClick={handleSubmit}>
                    Edit
                </div>
            </div>
        </div>
    )
}

export default CompanyEdit;