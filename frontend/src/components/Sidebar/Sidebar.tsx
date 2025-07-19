import React from "react";
import './Sidebar.css';
import {ReactComponent as Logo} from "../../assets/icons/colored-logo.svg";
import {ReactComponent as Home} from "../../assets/icons/home.svg";
import {ReactComponent as PieChart} from "../../assets/icons/pie-chart.svg";
import {ReactComponent as Sale} from "../../assets/icons/ticket.svg";
import {ReactComponent as List} from "../../assets/icons/list.svg";
import {ReactComponent as Building} from "../../assets/icons/building.svg";
import {ReactComponent as Archive} from "../../assets/icons/archive.svg";
import {ReactComponent as User} from "../../assets/icons/user.svg";
import {ReactComponent as Trending} from "../../assets/icons/trending-up.svg";
import {ReactComponent as File} from "../../assets/icons/file-text.svg";
import {NavLink} from "react-router-dom";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Logo/>
                    <h2>vendify <span className="gradient-text">Manager</span></h2>
                </div>
            </div>
            <ul>
                <li>
                    <NavLink to='/admin/home' className={({isActive}) =>
                        isActive ? "sidebar-li-container active" : "sidebar-li-container"
                    }>
                        <Home/>
                        <p>Home</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/analytics' className="sidebar-li-container">
                        <PieChart/>
                        <p>Analytics</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/finances' className="sidebar-li-container">
                        <Trending/>
                        <p>Finances</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/company' className="sidebar-li-container">
                        <Building/>
                        <p>Company</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/orders' className="sidebar-li-container">
                        <List/>
                        <p>Orders</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/deals' className="sidebar-li-container">
                        <Sale/>
                        <p>Deals</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/products' className="sidebar-li-container">
                        <Archive/>
                        <p>Products</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/customers' className="sidebar-li-container">
                        <User/>
                        <p>Customers</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/logs' className="sidebar-li-container">
                        <File/>
                        <p>Logs</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;