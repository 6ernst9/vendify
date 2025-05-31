import React from "react";
import './Customers.css';
import {ReactComponent as Search} from "../../assets/icons/search.svg";
import {useSelector} from "react-redux";
import {adminCustomersSelect} from "../../widgets/admin-customers-widget/model/selectors";

const Customers: React.FC = () => {
    const customers = useSelector(adminCustomersSelect.customers);

    return (
        <div className="customers-container">
            <div className="customers-header">
                <h1>Customers</h1>
            </div>
            <div className="customers-search">
                <div className="customers-search-bar">
                    <Search/>
                    <input type="text" className="search-bar" placeholder="Search customers..."/>
                </div>
                <p>{customers.length} customers</p>
            </div>
            <table className="customers-table">
                <thead>
                <tr>
                    <th><input type="checkbox"/></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Store</th>
                    <th>Last logged</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td><input type="checkbox"/></td>
                        <td>#{customer.id}</td>
                        <td>{customer.firstName} {customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.store}</td>
                        <td><span className='badge'>{customer.lastLogged}</span></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Customers;