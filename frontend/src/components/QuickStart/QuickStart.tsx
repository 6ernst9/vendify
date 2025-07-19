import React from "react";
import "./QuickStart.css";

// @ts-ignore
import photo from '../../assets/img/photo2.jpg';
// @ts-ignore
import photo2 from '../../assets/img/photo.jpeg';
import {useNavigate} from "react-router-dom";

const QuickStart: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="quick-start-section">
            <h2>Start selling in no time. <span className="different-text">Launch your store in under a minute.</span></h2>
            <div className="quick-start-content">
                <div className="quick-start-left">
                    <div className="quick-start-image">
                        <img src={photo}/>
                    </div>
                    <div className="quick-start-image second-img">
                        <img src={photo2}/>
                    </div>
                </div>
                <div className="quick-start-right">
                    <ul className="quick-start-steps">
                        <li>
                            <p className="step-number">1</p>
                            <p className="step-text">Create your store</p>
                        </li>
                        <li>
                            <p className="step-number">2</p>
                            <p className="step-text">Customize the look & feel</p>
                        </li>
                        <li>
                            <p className="step-number">3</p>
                            <p className="step-text">Start selling instantly</p>
                        </li>
                    </ul>

                    <div className="quick-start-button-container">
                        <div className="pill-button" onClick={() => navigate('/sign-up')}>Launch now</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickStart;
