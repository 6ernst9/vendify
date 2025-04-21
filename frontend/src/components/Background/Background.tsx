import React from "react";
// @ts-ignore
import video from '../../assets/video/banner.mp4';
import './Background.css';

const Background: React.FC = () => {
    return (
        <div className="homepage-background">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="background-video"
            >
                <source src={video} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="video-overlay"/>
            <div className="homepage-background-text">
                <h2>Be the next <br/>
                    global empire</h2>
                <p>Dream big, build fast, and grow faster <br/> with Vendify.</p>
                <div className="homepage-background-buttons">
                    <div className="homepage-background-trial-button">
                        Start free trial
                    </div>
                    <div className="homepage-background-plans-button">
                        View plans
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Background;