import React from "react";
import image from '../../assets/img/admin2.png';
import './AdminTool.css'

const AdminTool: React.FC = () => {
    return (
        <div className="homepage-admin-tool">
            <div className="homepage-admin-tool-header">
                <p>Desktop and mobile</p>
                <h2>Take care of your business</h2>
            </div>
            <div className="homepage-admin-container">
                <div className="homepage-admin-tool-container">
                    <div className="homepage-admin-tool-image-container">
                        <img src={image}/>
                    </div>
                    <div className="homepage-admin-tool-text-container">
                        <h2>Manage everything in one place</h2>
                        <p>From back office to front of store, you’re always in control with our powerful Vendify
                            Admin.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminTool;