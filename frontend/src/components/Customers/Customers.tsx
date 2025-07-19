import React, {useEffect, useState} from "react";
import './Customers.css';
import {ReactComponent as Search} from "../../assets/icons/search.svg";
import {useSelector} from "react-redux";
import {adminCustomersSelect} from "../../widgets/admin-customers-widget/model/selectors";

const Customers: React.FC = () => {
    const customers = useSelector(adminCustomersSelect.customers);
    const [customersFiltered, setCustomers] = useState(customers);

    useEffect(() => {
        setCustomers(customers);
    }, [customers]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result = customers;
        const search = e.target.value;

        if(search !== undefined && search !== '') {
            result = result.filter(p =>
                p.firstName.toLowerCase().includes(search.toLowerCase()) ||
                p.lastName?.toLowerCase().includes(search.toLowerCase()) ||
                p.email?.toLowerCase().includes(search.toLowerCase())
            );
        }

        setCustomers(result);
    }

    return (
        <div className="customers-container">
            <div className="customers-header">
                <h1>Customers</h1>
            </div>
            <div className="customers-search">
                <div className="customers-search-bar">
                    <Search/>
                    <input
                        type="text"
                        className="search-bar"
                        onChange={handleSearch}
                        placeholder="Search customers..."/>
                </div>
                <p>{customersFiltered.length} customers</p>
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
                {customersFiltered.map((customer) => (
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