import React from "react";
import "./Navbar.css";
import {ReactComponent as Bell} from "../../assets/icons/bell.svg";
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
                <Bell/>
                <User/>
                <span>Antonio Cassini</span>
            </div>
        </div>
    );
}

export default Navbar;
