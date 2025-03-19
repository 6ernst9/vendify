import React from "react";
import './Wishlist.css';

const Wishlist: React.FC = () => {
    return (
        <div className="wishlist">
            <div className="wishlist-header">
                <h2 className="wishlist-category">Wishlist (4)</h2>
                <div className="wishlist-button">
                    <h3>Move All To Bag</h3>
                </div>
            </div>
        </div>
    )
}

export default Wishlist;