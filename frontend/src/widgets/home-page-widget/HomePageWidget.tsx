import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Background from "../../components/Background/Background";
import QuickStart from "../../components/QuickStart/QuickStart";
import './styles.css';
import AdminTool from "../../components/AdminTool/AdminTool";
import Advantages from "../../components/Advantages/Advantages";

const HomePageWidget: React.FC = () => {
    return (
        <div className="home-page-widget">
            <Topbar/>
            <Background/>
            <QuickStart/>
            <AdminTool/>
            <Advantages/>
        </div>
    )
}

export default HomePageWidget;