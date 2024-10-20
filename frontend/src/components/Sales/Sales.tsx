import React from "react";
import './Sales.css';

const Sales: React.FC = () => {
    return (
        <div className="sales">
            <div className="sales-header">
                <span/>
                <p>Today's</p>
            </div>
            <div className="sales-title">
                <h2>Flash Sales</h2>
                <div className="sales-title-timer">
                    <div className="sales-title-timer-container">
                        <p>Days</p>
                        <h3>03</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Hours</p>
                        <h3>23</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Minutes</p>
                        <h3>19</h3>
                    </div>
                    <p className="sales-title-timer-points">:</p>
                    <div className="sales-title-timer-container">
                        <p>Seconds</p>
                        <h3>56</h3>
                    </div>
                </div>
                <div className="sales-title-button">
                    <p>View All Products</p>
                </div>
            </div>
        </div>
    )
}

export default Sales;