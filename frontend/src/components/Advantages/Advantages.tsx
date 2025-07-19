import React from "react";
// @ts-ignore
import image1 from '../../assets/img/esentials-mobile.png';
import image2 from '../../assets/img/photo4.png';
import image3 from '../../assets/img/exclusive-mobile.png';
import './Advantages.css';

const Advantages: React.FC = () => {
    return (
        <div className="homepage-advantages">
            <div className="homepage-advantages-header">
                <h2>The all-in-one platform to launch, grow, and sell.</h2>
                <p>Sell online.  <span className="different-text">Sell anywhere and anytime.</span> Sell on desktop and mobile. <span className="different-text">No code, no hassle.</span></p>
            </div>
            <div className="homepage-advantages-photos">
                <img src={image1}/>
                <img src={image2}/>
                <img src={image3}/>
            </div>
        </div>
    )
}

export default Advantages;