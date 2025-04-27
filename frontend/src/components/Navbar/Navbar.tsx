import React from "react";
import "./Navbar.css";
import {ReactComponent as Search} from "../../assets/icons/search.svg";
import {ReactComponent as User} from "../../assets/icons/user.svg";
import {useSelector} from "react-redux";
import {sessionSelect} from "../../redux/core/session/selectors";

const Navbar: React.FC = () => {
    const email = useSelector(sessionSelect.email);
    return (
        <div className="navbar">
            <div className="navbar-search-bar">
                <Search/>
                <input type="text" className="search-bar" placeholder="Search here..."/>
            </div>
            <div className="navbar-user-info">
                <User/>
                <span>{email}</span>
            </div>
        </div>
    );
}

export default Navbar;
