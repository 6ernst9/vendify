import React from "react";
import './NotFound.css';
import {useNavigate} from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-text">
                <h3>404 Not Found</h3>
                <p>Your visited page was not found. You may go to the home page.</p>
            </div>
            <div className="not-found-home-page-button"
            onClick={() => navigate("")}>
                Back To Home Page
            </div>
        </div>
    )
}

export default NotFound;