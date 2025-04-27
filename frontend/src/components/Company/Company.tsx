import React, {useEffect} from "react";
import './Company.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as Search} from "../../assets/icons/search.svg";

import {StoreState} from "../../redux/core/store/types";
import {setCurrentAdminStore} from "../../widgets/admin-store-page-widget/model/reducers";
import {userStoresSelect} from "../../widgets/admin-store-widget/model/selectors";
import {getStores} from "../../widgets/admin-store-widget/model/effects";
import {sessionSelect} from "../../redux/core/session/selectors";

const Company: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const id = useSelector(sessionSelect.id);
    const accessToken = useSelector(sessionSelect.accessToken);
    const stores = useSelector(userStoresSelect.stores);

    useEffect(() => {
        getStores({id, accessToken, dispatch});
    }, [accessToken, id]);

    const selectStore = (store: StoreState) => {
        dispatch(setCurrentAdminStore(store));
        navigate(`/admin/company/${store.path}`)
    }

    return (
        <div className="company-container">
            <div className="company-header">
                <h1>Company</h1>
                <div className="company-header-buttons">
                    <div className="company-configuration-header-button">
                        Edit
                    </div>
                    <div className="company-header-button" onClick={() => navigate("create")}>
                        Add
                    </div>
                </div>
            </div>
            <div className="company-search">
                <div className="company-search-bar">
                    <Search/>
                    <input type="text" placeholder="Search stores..."/>
                </div>
                <p>{stores.length} stores</p>
            </div>
            {stores.length === 0 && (
                <div className="company-empty-container">
                    <h2>You haven’t created a store yet</h2>
                    <p>To start selling your products, you need to create your store profile.</p>
                </div>
            )}
            {stores.length !== 0 && (
                <table className="company-table">
                    <thead>
                    <tr>
                        <th>Store</th>
                        <th>Name</th>
                        <th>Path</th>
                        <th>Customers</th>
                        <th>Orders</th>
                        <th>Business no.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stores.map((store) => (
                        <tr key={store.name} onClick={() => selectStore(store)}>
                            <td className="order-id">#{store.id}</td>
                            <td>{store.name}</td>
                            <td className="highlighted-text">/{store.path}</td>
                            <td>245</td>
                            <td>21</td>
                            <td className="total">3,232,21$</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Company;