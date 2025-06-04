import React, {useEffect} from "react";
import './Dashboards.css';
import {ReactComponent as Up} from "../../assets/icons/arrow-up-right.svg";
import {ReactComponent as Down} from "../../assets/icons/arrow-down-right.svg";
import {ReactComponent as Order} from "../../assets/icons/list.svg";
import {ReactComponent as Product} from "../../assets/icons/archive.svg";
import {ReactComponent as Company} from "../../assets/icons/building.svg";
// @ts-ignore
import {
    ResponsiveContainer,
    Tooltip,
    Area,
    AreaChart, YAxis, XAxis, CartesianGrid
} from "recharts";
import {useDispatch, useSelector} from "react-redux";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {adminHomeSelect} from "../../widgets/admin-home-widget/model/selectors";
import {getSessionCount, getTotalSessions} from "../../widgets/admin-home-widget/model/effects";
import {adminStoreSelect} from "../../widgets/admin-store-page-widget/model/selectors";

const data = [
    {label: '12AM', value: 50},
    {label: '4AM', value: 100},
    {label: '8AM', value: 80},
    {label: '12PM', value: 120},
    {label: '4PM', value: 150},
    {label: '8PM', value: 200},
    {label: '12AM', value: 180},
];

const Dashboards: React.FC = () => {
    const name = useSelector(adminSessionSelect.firstName);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const storeId = useSelector(adminStoreSelect.id);
    const dispatch = useDispatch();

    const sessionPerHour = useSelector(adminHomeSelect.sessionCount);
    const totalSessions = useSelector(adminHomeSelect.totalSessions);

    useEffect(() => {
        getSessionCount({accessToken, storeId, dispatch});
        getTotalSessions({accessToken, storeId, dispatch});
    }, [accessToken, storeId]);

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <div className='dashboard-header'>
                    <h1>Overview</h1>
                    <p>Welcome back, {name}! Here’s a quick look at how your store is performing today.</p>
                </div>
                <div className="dashboard-widgets">
                    <h2>Today's summary</h2>
                    <div className="dashboard-stats">
                        <div className="dashboard-stat-card">
                            <p className="dashboard-stat-label">Total Sessions</p>
                            <div className="dashboard-stat-value-container">
                                <p className="dashboard-stat-value">{totalSessions}</p>
                                <div className="dashboard-stat-increase">
                                    <Up/>
                                    <p>1%</p>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={sessionPerHour}>
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={0.4}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        horizontal={true}
                                        vertical={false}
                                    />

                                    <YAxis
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                        width={30}
                                    />

                                    <XAxis
                                        dataKey="label"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                        interval="preserveEnd"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#1255cb"
                                        strokeWidth={2}
                                        fill="url(#lineGradient)"
                                        dot={false}
                                    />
                                    <Tooltip
                                        contentStyle={{display: "none"}}
                                        cursor={false}
                                        wrapperStyle={{display: "none"}}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="dashboard-single-stat-card">
                            <div className="dashboard-stat-card">
                                <p className="dashboard-stat-label">Total Sales</p>
                                <div className="dashboard-stat-value-container">
                                    <p className="dashboard-single-stat-value">24,222.50$</p>
                                    <div className="dashboard-single-stat-increase">
                                        <Up/>
                                        <p>3%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-single-stat-card">
                            <div className="dashboard-stat-card">
                                <p className="dashboard-stat-label">Total Orders</p>
                                <div className="dashboard-stat-value-container">
                                    <p className="dashboard-single-stat-value">56</p>
                                    <div className="dashboard-single-stat-increase decrease">
                                        <Down/>
                                        <p>2%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-to-do">
                    <h3>Things to do</h3>
                    <div className="dashboard-to-do-cards">
                        <div className="dashboard-to-do-card">
                            <Order/>
                            <p>10 orders to fulfill</p>
                        </div>
                        <div className="dashboard-to-do-card">
                            <Product/>
                            <p>3 products to re-stock</p>
                        </div>
                        <div className="dashboard-to-do-card">
                            <Company/>
                            <p>Add banner to homepage</p>
                        </div>
                    </div>
                </div>
                <div className="dashboards-top">
                    <div className="dashboard-top-card">
                        <h3>Top Products</h3>
                        <table className="dashboard-top-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total Sales</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="dashboard-table-name">Wireless Headphones</td>
                                <td>1,250</td>
                            </tr>
                            <tr>
                                <td className="dashboard-table-name">Laptop Stand</td>
                                <td>924</td>
                            </tr>
                            <tr>
                                <td className="dashboard-table-name">Bluetooth Speaker</td>
                                <td>721</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="dashboard-top-card">
                        <h3>Recent orders</h3>
                        <table className="dashboard-top-table">
                            <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Total Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="dashboard-table-name">Ariana Johns</td>
                                <td>240.00$</td>
                            </tr>
                            <tr>
                                <td className="dashboard-table-name">Henry Barber</td>
                                <td>1,180.00$</td>
                            </tr>
                            <tr>
                                <td className="dashboard-table-name">Duke Dennis</td>
                                <td>139.93$</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboards;