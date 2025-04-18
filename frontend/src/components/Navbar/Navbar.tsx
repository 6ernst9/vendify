import React from "react";
import "./Navbar.css";
import {ReactComponent as Search} from "../../assets/icons/search.svg";
import {ReactComponent as User} from "../../assets/icons/user.svg";

const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <div className="navbar-search-bar">
                <Search/>
                <input type="text" className="search-bar" placeholder="Search here..."/>
            </div>
            <div className="navbar-user-info">
                <User/>
                <span>Antonio Cassini</span>
            </div>
        </div>
    );
}

export default Navbar;
