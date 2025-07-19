import React from "react";
import { useNavigate } from "react-router-dom";
import './DealPage.css';
import { useSelector } from "react-redux";
import {adminDealSelect} from "../../widgets/admin-deal-page-widget/model/selectors";
import {deleteSale} from "../../widgets/admin-deal-page-widget/model/effects";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";

const DealPage: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(adminSessionSelect.accessToken);

    const id = useSelector(adminDealSelect.id);
    const name = useSelector(adminDealSelect.name);
    const code = useSelector(adminDealSelect.code);
    const status = useSelector(adminDealSelect.status);
    const percentage = useSelector(adminDealSelect.percentage);
    const endDate = useSelector(adminDealSelect.endDate);
    const productIds = useSelector(adminDealSelect.productIds);
    const store = useSelector(adminDealSelect.store);

    const handleDelete = async () => {
        await deleteSale(id, accessToken);
        navigate(`/admin/deals`)
    }

    return (
        <div className="deal-page-container">
            <div className="deal-page-header">
                <h1>Deal:{name}</h1>
                <div className="deal-page-header-buttons">
                    <div className="deal-page-configuration-delete-button"
                         onClick={handleDelete}>
                        Delete
                    </div>
                    <div className="deal-page-configuration-header-button" onClick={() => navigate(`/admin/deals`)}>
                        Back
                    </div>
                </div>
            </div>

            <div className="deal-page-info-container">
                <div className="deal-page-configuration-header">
                    <h1>General info</h1>
                </div>
                <div className="deal-page-section">
                    <h1>ID</h1>
                    <p>{id}</p>
                </div>
                <hr className="deal-page-divider"/>
                <div className="deal-page-section">
                    <h1>Name</h1>
                    <p>{name}</p>
                </div>
                <hr className="deal-page-divider"/>
                <div className="deal-page-section">
                    <h1>Code</h1>
                    <p>{code ?? 'NOT A COUPON'}</p>
                </div>
                <hr className="deal-page-divider"/>
                <div className="deal-page-section">
                    <h1>Store ID</h1>
                    <p>#{store}</p>
                </div>
            </div>
            <div className="deal-page-info-container">
                <div className="deal-page-configuration-header">
                    <h1>Deal details</h1>
                </div>
                <div className="deal-page-section">
                    <h1>Discount</h1>
                    <p>{percentage}%</p>
                </div>
                <hr className="deal-page-divider"/>
                <div className="deal-page-section">
                    <h1>Status</h1>
                    <p>{status}</p>
                </div>
                <hr className="deal-page-divider"/>
                <div className="deal-page-section">
                    <h1>End Date</h1>
                    <p>{endDate}</p>
                </div>
                <hr className="deal-page-divider"/>
                <div className="deal-page-section">
                    <h1>Products Affected</h1>
                    <p>{productIds.length > 0 ? productIds.join(", ") : "No products selected."}</p>
                </div>
            </div>
        </div>
    );
};

export default DealPage;
