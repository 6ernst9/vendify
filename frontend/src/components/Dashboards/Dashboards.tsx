import React, {useEffect, useRef, useState} from "react";
import './Dashboards.css';
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
import {
    getHomeKPIs,
    getOrdersByStore,
    getSessionCount,
    getTopSellingProducts,
    getTotalSessions
} from "../../widgets/admin-home-widget/model/effects";
import {userStoresSelect} from "../../widgets/admin-store-widget/model/selectors";
import {getLogs} from "../../widgets/admin-logs-widget/model/effects";
import {highlightLog} from "../Logs/Logs";
import {formatNumber} from "../../util/numbers";

const Dashboards: React.FC = () => {
    const name = useSelector(adminSessionSelect.firstName);
    const logsRef = useRef<HTMLDivElement>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const stores = useSelector(userStoresSelect.stores);
    const dispatch = useDispatch();
    const sessionPerHour = useSelector(adminHomeSelect.sessionCount);
    const totalSessions = useSelector(adminHomeSelect.totalSessions);
    const topSelling = useSelector(adminHomeSelect.topProducts);
    const recentOrders = useSelector(adminHomeSelect.recentOrders);
    const quickKPIs = useSelector(adminHomeSelect.quickKPIs);

    const tabs = stores.map((store) => {
        return {id: store.id, label: store.name}
    });
    const [activeTab, setActiveTab] = useState('');

    const handleChangeStore = async (id: string) => {
        setActiveTab(id);
        await getSessionCount(id, accessToken, dispatch);
        await getTotalSessions(id, accessToken, dispatch);
        await getTopSellingProducts(id, accessToken, dispatch);
        await getOrdersByStore(id, accessToken, dispatch);
        await getHomeKPIs(id, accessToken, dispatch);
        fetchLogs(id);
    }

    const fetchLogs = (id: string) => {
        if(stores.length > 0) {
            getLogs( id, accessToken, dispatch).then((logs) => setLogs(logs));
        }
        logsRef.current?.scrollTo({
            top: logsRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        if(stores.length > 0) {
            setActiveTab(stores[0].id)
            fetchLogs(stores[0].id);
            getSessionCount(stores[0].id, accessToken, dispatch);
            getTotalSessions(stores[0].id, accessToken, dispatch);
            getTopSellingProducts(stores[0].id, accessToken, dispatch);
            getOrdersByStore(stores[0].id, accessToken, dispatch);
            getHomeKPIs(stores[0].id, accessToken, dispatch);
        }
    }, [accessToken, stores]);

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <div className='dashboard-header'>
                    <h1>Overview</h1>
                    <p>Welcome back, {name}! Here’s a quick look at how your store is performing today.</p>
                </div>
                <div className="analytics-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleChangeStore(tab.id)}
                            className={`analytics-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="dashboard-widgets">
                    <h2>Quick summary</h2>
                    <div className="dashboard-stats">
                        <div className="dashboard-stat-card">
                            <p className="dashboard-stat-label">Total Sessions</p>
                            <div className="dashboard-stat-value-container">
                                <p className="dashboard-stat-value">{totalSessions} sessions</p>
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
                                    <p className="dashboard-single-stat-value">{formatNumber(quickKPIs[0])}$</p>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-single-stat-card">
                            <div className="dashboard-stat-card">
                                <p className="dashboard-stat-label">Total Orders</p>
                                <div className="dashboard-stat-value-container">
                                    <p className="dashboard-single-stat-value">{formatNumber(quickKPIs[1])} orders</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-to-do">
                    <div className="dashboard-to-do-header">
                        <h3>Activity</h3>
                        <div className="live-container">
                            <h3>Live</h3>
                            <div className="recording-indicator"/>
                        </div>
                    </div>
                    <div className="dashboards-logs-container" ref={logsRef}>
                    {logs.map((log) => (
                            <>
                                {highlightLog(log)}
                            </>
                        ))}
                    </div>
                </div>
                <div className="dashboards-top">
                    <div className="dashboard-top-card">
                        <h3>Top Products</h3>
                        <table className="dashboard-top-table">
                            <thead>
                            <tr>
                                <th>Product No.</th>
                                <th>Total Sales</th>
                            </tr>
                            </thead>
                            <tbody>
                            {topSelling.map((top, index) => {
                                if (index < 3) {
                                    return (<tr>
                                        <td className="dashboard-table-name">#{top.productId}</td>
                                        <td>{formatNumber(top.totalSold)} sales</td>
                                    </tr>)
                                }
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="dashboard-top-card">
                        <h3>Recent orders</h3>
                        <table className="dashboard-top-table">
                            <thead>
                            <tr>
                                <th>Customer No.</th>
                                <th>Total Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recentOrders.map((top, index) => {
                                if (index < 3) {
                                    return (<tr>
                                        <td className="dashboard-table-name">#{top.customerId}</td>
                                        <td>{formatNumber(top.price)}$</td>
                                    </tr>)
                                }
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboards;