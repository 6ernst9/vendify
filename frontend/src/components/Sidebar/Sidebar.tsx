import React from "react";
import './Sidebar.css';
import {ReactComponent as Logo} from "../../assets/icons/colored-logo.svg";
import {ReactComponent as Menu} from "../../assets/icons/menu.svg";
import {ReactComponent as Home} from "../../assets/icons/home.svg";
import {ReactComponent as PieChart} from "../../assets/icons/pie-chart.svg";
import {ReactComponent as Sale} from "../../assets/icons/ticket.svg";
import {ReactComponent as List} from "../../assets/icons/list.svg";
import {ReactComponent as Building} from "../../assets/icons/building.svg";
import {ReactComponent as Archive} from "../../assets/icons/archive.svg";
import {ReactComponent as File} from "../../assets/icons/file.svg";
import {ReactComponent as Settings} from "../../assets/icons/settings.svg";
import {NavLink} from "react-router-dom";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Logo/>
                    <h2>vendify</h2>
                </div>
               <Menu/>
            </div>
            <ul>
                <li>
                    <NavLink to='/admin/dashboard' className={({isActive}) =>
                        isActive ? "sidebar-li-container active" : "sidebar-li-container"
                        }>
                        <Home/>
                        <p>Dashboard</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/reports' className="sidebar-li-container">
                        <PieChart/>
                        <p>Report</p>
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
                    <NavLink to='/admin/documents' className="sidebar-li-container">
                        <File/>
                        <p>Documents</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/admin/settings' className="sidebar-li-container">
                        <Settings/>
                        <p>Settings</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;