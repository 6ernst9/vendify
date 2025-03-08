import React from "react";
import image from "../../assets/img/new_arrivals.png";
import "./NewArrivals.css";

const NewArrivals: React.FC = () => {
    return (
        <div className="new-arrivals">
            <div className="new-arrivals-header">
                <span/>
                <p>Featured</p>
            </div>
            <div className="new-arrivals-title">
                <h2>New Arrivals</h2>
            </div>
            <div className="new-arrivals-img-container">
                <img src={image} className="new-arrivals-img"/>
            </div>
        </div>
    )
}

export default NewArrivals;