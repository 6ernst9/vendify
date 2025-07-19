import React, {useState} from "react";
import './CompanyCreate.css';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {createStore} from "../../widgets/admin-store-create-widget/model/effects";
import {uploadImageToFirebase} from "../../util/upload";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";

const CompanyCreate: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const id = useSelector(adminSessionSelect.id);

    const [error, setError] = useState('');

    const [name, setStoreName] = useState('');
    const [path, setStorePath] = useState('');

    const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setStoreName(e.target.value);
    const handleStorePathChange = (e: React.ChangeEvent<HTMLInputElement>) => setStorePath(e.target.value);

    const [logo, setLogo] = useState<string>('');
    const [banner, setBanner] = useState<string>('');

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

    const [primaryColor, setPrimaryColor] = useState('#ff0000');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [titleColor, setTitleColor] = useState('#000000');
    const [textSecondaryColor, setTextSecondaryColor] = useState('#6b7280');
    const [font, setFont] = useState('Inter');
    const [buttonRadius, setButtonRadius] = useState(6);
    const [cardRadius, setCardRadius] = useState(10);
    const [navbarStyle, setNavbarStyle] = useState<'solid' | 'blur'>('solid');

    const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrimaryColor(e.target.value);
    const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(e.target.value);
    const handleTitleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleColor(e.target.value);
    const handleTextSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setTextSecondaryColor(e.target.value);
    const handleFontChange = (e: React.ChangeEvent<HTMLInputElement>) => setFont(e.target.value);
    const handleButtonRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => setButtonRadius(Number(e.target.value));
    const handleCardRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => setCardRadius(Number(e.target.value));
    const handleNavbarStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setNavbarStyle(e.target.value as 'solid' | 'blur');

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
    const handleFacebookChange = (e: React.ChangeEvent<HTMLInputElement>) => setFacebook(e.target.value);
    const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => setTwitter(e.target.value);
    const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => setInstagram(e.target.value);

    const handleSubmit = async () => {
        if(name !== '' && path !== '') {
            await createStore(
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
    return (
        <div className="company-create-container">
            <div className="company-create-header">
                <h1>Company:create</h1>
                <div className="company-page-header-button" onClick={() => navigate('/admin/company')}>
                    Back
                </div>
            </div>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Store Info</h1>
                    <p>Define the basic details of your store, including its name and public URL path. This information
                        helps identify your store across the platform and will be visible to your customers.</p>
                </div>
                <div className="company-create-selector">
                    <h1>Company Name</h1>
                    <input type="text" onChange={handleStoreNameChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Path</h1>
                    <input type="text" onChange={handleStorePathChange}/>
                </div>
            </div>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Branding</h1>
                    <p>Customize your store's visual identity by uploading a logo and banner image. These assets will be
                        displayed on your storefront and help reinforce your brand’s presence.</p>
                </div>
                <div className="company-create-selector">
                    <h1>Logo</h1>
                    <input
                        type="file"
                        id="logo-upload"
                        style={{ display: 'none' }}
                        onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload" className="company-page-header-button">
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
                    <label htmlFor="banner-upload" className="company-page-header-button">
                        Upload
                    </label>

                    {banner && <p className="company-create-file-name">{banner.split('/').pop()?.split('?')[0]}</p>}

                </div>
            </div>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Theme</h1>
                    <p>Personalize your store’s look and feel by selecting the colors. These settings define the visual
                        style of your storefront and create a consistent brand experience.</p>
                </div>
                <div className="company-create-color">
                    <input type="color" onChange={handlePrimaryColorChange}/>
                    <p>Primary Color</p>
                </div>
                <div className="company-create-color" onChange={handleBackgroundColorChange}>
                    <input type="color"/>
                    <p>Background Color</p>
                </div>
                <div className="company-create-color" onChange={handleTitleColorChange}>
                    <input type="color"/>
                    <p>Text Color</p>
                </div>
                <div className="company-create-color" onChange={handleTextSecondaryColorChange}>
                    <input type="color"/>
                    <p>Secondary Text Color</p>
                </div>
                <div className="company-create-selector" onChange={handleFontChange}>
                    <h1>Font Family</h1>
                    <input type="text"/>
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
                        <option value="solid">Solid</option>
                        <option value="blur">Blur</option>
                    </select>
                </div>

            </div>
            <div className="company-create-info-container">
                <div className="company-create-info">
                    <h1>Contact Links</h1>
                    <p>Provide your store’s communication channels so customers can reach out. Include an email, phone
                        number, and any relevant social media links.</p>
                </div>
                <div className="company-create-selector">
                    <h1>Email</h1>
                    <input type="text" onChange={handleEmailChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Phone</h1>
                    <input type="text" onChange={handlePhoneChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Facebook</h1>
                    <input type="text" onChange={handleFacebookChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Twitter</h1>
                    <input type="text" onChange={handleTwitterChange}/>
                </div>
                <div className="company-create-selector">
                    <h1>Instagram</h1>
                    <input type="text" onChange={handleInstagramChange}/>
                </div>
            </div>
            <div className="company-create-info">
                <div className="company-create-final-button" onClick={handleSubmit}>
                    Create
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;