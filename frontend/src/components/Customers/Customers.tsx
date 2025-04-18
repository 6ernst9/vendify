import React from "react";
import './Customers.css';
import {ReactComponent as Search} from "../../assets/icons/search.svg";

const customers = [
    { id: '#1165', email: 'alekcrona@gmail.com', name: 'Alek Crona', orders: '2', lastLogged: '1min ago' },
    { id: '#1164', email: 'skuvalis12@yahoo.com', name: 'Santos Kuvalis', orders: '3', lastLogged: '3h ago' },
    { id: '#1163', email: 'she_braun@hotmail.com', name: 'Sheila Braun', orders: '16', lastLogged: '2w ago' },
    { id: '#1162', email: 'akundingcandine1@gmail.com', name: 'Candice Ankunding', orders: '1', lastLogged: 'never' },
    { id: '#1161', email: 'marviner@outlook.com', name: 'Eryn Marvin', orders: '0', lastLogged: '5d ago' },
]
const Customers: React.FC = () => {
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
                <p>5322 customers</p>
            </div>
            <table className="customers-table">
                <thead>
                <tr>
                    <th><input type="checkbox"/></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>No. orders</th>
                    <th>Last logged</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td><input type="checkbox"/></td>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.orders}</td>
                        <td><span className='badge'>{customer.lastLogged}</span></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Customers;