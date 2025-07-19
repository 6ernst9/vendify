import React, {useEffect, useState} from "react";
import './Company.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as Search} from "../../assets/icons/search.svg";

import {setCurrentAdminStore} from "../../widgets/admin-store-page-widget/model/reducers";
import {userStoresSelect} from "../../widgets/admin-store-widget/model/selectors";
import {StoreProp} from "../../widgets/admin-store-widget/model/types";
import {formatNumber} from "../../util/numbers";

const Company: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const stores = useSelector(userStoresSelect.stores);

    const [storesFiltered, setStores] = useState(stores);

    useEffect(() => {
        setStores(stores);
    }, [stores]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result = stores;
        const search = e.target.value;

        if(search !== undefined && search !== '') {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.path?.toLowerCase().includes(search.toLowerCase())
            );
        }

        setStores(result);
    }

    const selectStore = (store: StoreProp) => {
        dispatch(setCurrentAdminStore(store));
        navigate(`/admin/company/${store.id}`)
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
                    <input type="text" placeholder="Search stores..." onChange={handleSearch}/>
                </div>
                <p>{storesFiltered.length} stores</p>
            </div>
            {storesFiltered.length === 0 && (
                <div className="company-empty-container">
                    <h2>You haven’t created a store yet</h2>
                    <p>To start selling your products, you need to create your store profile.</p>
                </div>
            )}
            {storesFiltered.length !== 0 && (
                <table className="company-table">
                    <thead>
                    <tr>
                        <th>Store No.</th>
                        <th>Name</th>
                        <th>Path</th>
                        <th>Customers</th>
                        <th>Orders</th>
                        <th>Business no.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {storesFiltered.map((store) => (
                        <tr key={store.name}>
                            <td className="store-id" onClick ={() => selectStore(store)}>#{store.id}</td>
                            <td>{store.name}</td>
                            <td className="highlighted-text" onClick={() => navigate(`/${store.path}`)}>/{store.path}</td>
                            <td>{store.customers}</td>
                            <td>{store.orderNo}</td>
                            <td className="total">{formatNumber(store.revenue)}$</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Company;