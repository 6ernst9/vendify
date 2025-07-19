import React, {useEffect, useState} from "react";
import './Analytics.css';
import {useDispatch, useSelector} from "react-redux";
import {userStoresSelect} from "../../widgets/admin-store-widget/model/selectors";
import {adminAnalyticsSelect} from "../../widgets/admin-analytics-widget/model/selectors";
import {
    getAvgSessions, getMostActiveUsers, getMostCartedProducts, getMostViewedProducts, getMostVisitedPages,
    getMostWishlistedProducts,
    getQuickKPIs,
    getSessionCount
} from "../../widgets/admin-analytics-widget/model/effects";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {formatNumber} from "../../util/numbers";
import {
    Area,
    AreaChart, Bar, BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const donutColors = [
    '#1255cb',
    '#00E88F',
    '#FF6B6B',
    '#FFA726',
    '#AB47BC',
];

const Analytics: React.FC = () => {
    const stores = useSelector(userStoresSelect.stores);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const dispatch = useDispatch();
    const tabs = stores.map((store) => {
        return {id: store.id, label: store.name}
    });
    const [activeTab, setActiveTab] = useState('');
    const sessionPerHour = useSelector(adminAnalyticsSelect.sessionCount);
    const sessionTypes = useSelector(adminAnalyticsSelect.sessionType);
    const quickKPIs = useSelector(adminAnalyticsSelect.quickKPIs);
    const avgSession = useSelector(adminAnalyticsSelect.avgSessions);
    const mostWishlisted = useSelector(adminAnalyticsSelect.mostWishlisted);
    const mostCarted = useSelector(adminAnalyticsSelect.mostCarted);
    const mostViewedProducts = useSelector(adminAnalyticsSelect.mostViewed);
    const mostActiveUsers = useSelector(adminAnalyticsSelect.mostActiveUsers);
    const mostVisitedPages = useSelector(adminAnalyticsSelect.mostVisitedPages);

    const handleChangeStore = async (id: string) => {
        setActiveTab(id);
        await getSessionCount(id, accessToken, dispatch);
        await getQuickKPIs(id, accessToken, dispatch);
        await getAvgSessions(id, accessToken, dispatch);
        await getMostWishlistedProducts(id, accessToken, dispatch);
        await getMostViewedProducts(id, accessToken, dispatch);
        await getMostCartedProducts(id, accessToken, dispatch);
        await getMostActiveUsers(id, accessToken, dispatch);
        await getMostVisitedPages(id, accessToken, dispatch);
    }

    useEffect(() => {
        if(stores.length > 0) {
            setActiveTab(stores[0].id);
        }
    }, [stores]);

    return (
        <div className="analytics">
            <div className="analytics-container">
                <div className='analytics-header'>
                    <h1>Analytics</h1>
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
                {stores.length === 0 && (
                    <div className="analytics-empty-container">
                        <h2>You have no stores yet</h2>
                        <p>Create a store to start seeing real-time analytics.</p>
                    </div>
                )}
                <div className="analytics-kpis">
                    <h2>Quick KPIs</h2>
                    <div className="analytics-stats">
                        <div className="analytics-single-stat-card">
                            <div className="analytics-stat-card">
                                <p className="analytics-stat-label">Returning User Rate</p>
                                <div className="analytics-stat-value-container">
                                    <p className="analytics-single-stat-value">{formatNumber(quickKPIs[2])}%</p></div>
                            </div>
                        </div>
                        <div className="analytics-single-stat-card">
                            <div className="analytics-stat-card">
                                <p className="analytics-stat-label">Average Session Duration</p>
                                <div className="analytics-stat-value-container">
                                    <p className="analytics-single-stat-value">{formatNumber(quickKPIs[1])} seconds</p>
                                </div>
                            </div>
                        </div>
                        <div className="analytics-single-stat-card">
                            <div className="analytics-stat-card">
                                <p className="analytics-stat-label">Active Users (10 minutes)</p>
                                <div className="analytics-stat-value-container">
                                    <p className="analytics-single-stat-value">{formatNumber(quickKPIs[3])}</p>
                                </div>
                            </div>
                        </div>
                        <div className="analytics-single-stat-card">
                            <div className="analytics-stat-card">
                                <p className="analytics-stat-label">Total Sessions Today</p>
                                <div className="analytics-stat-value-container">
                                    <p className="analytics-single-stat-value">{formatNumber(quickKPIs[0])}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="analytics-kpis">
                    <h2>Sessions Analytics</h2>
                    <div className="analytics-stats">
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Total Sessions</p>
                            <ResponsiveContainer width="100%" height={250}>
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
                                        formatter={(value: number) => `${value} sessions`}
                                        labelFormatter={(label) => `${label}`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Average Session Duration</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={avgSession}>
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={0.4} />
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />

                                    <YAxis
                                        tick={{ fontSize: 10, fill: "#6B7280" }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={30}
                                        domain={[0, 'dataMax']}
                                    />

                                    <XAxis
                                        dataKey="hour"
                                        tick={{ fontSize: 10, fill: "#6B7280" }}
                                        tickFormatter={(h) => `${h}:00`}
                                        axisLine={false}
                                        tickLine={false}
                                        interval="preserveEnd"
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="avgMinutes"
                                        stroke="#1255cb"
                                        strokeWidth={2}
                                        fill="url(#lineGradient)"
                                        dot={false}
                                    />

                                    <Tooltip
                                        formatter={(value: number) => `${value} min`}
                                        labelFormatter={(label) => `${label}:00`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Sessions Ratio</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={sessionTypes.data}
                                        dataKey="count"
                                        nameKey="type"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {sessionTypes.data.map((_, index) => (
                                            <Cell key={`cell-${index}`}
                                                  fill={sessionTypes.colors[index % sessionTypes.colors.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="analytics-kpis">
                    <h2>Product Insights</h2>
                    <div className="analytics-stats">
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Most Viewed Products</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={mostViewedProducts}>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
                                    <XAxis
                                        dataKey="productId"
                                        tick={{ fontSize: 10, fill: "#6B7280" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        dataKey="count"
                                        domain={[0, 'dataMax']}
                                        tick={{ fontSize: 10, fill: "#6B7280" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${value} views`}
                                        labelFormatter={(label) => `Product ID ${label}`}
                                    />
                                    <Bar dataKey="count" fill="url(#blueGradient)" />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Most Added to Cart</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={mostCarted}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="productId"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        domain={[0, 'dataMax']}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${value} added to cart`}
                                        labelFormatter={(label) => `Product ID ${label}`}
                                    />
                                    <Bar dataKey="count" fill="url(#blueGradient)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Most Wishlisted Products</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={mostWishlisted}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="productId"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[0, 'dataMax']}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${value} added to wishlists`}
                                        labelFormatter={(label) => `Product ID ${label}`}
                                    />
                                    <Bar dataKey="count" fill="url(#blueGradient)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="analytics-kpis">
                    <h2>Activity Analytics</h2>
                    <div className="analytics-stats">
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Most Active Users Table</p>
                            <div className="analytics-table-wrapper">
                            <table className="analytics-table">
                                    <thead className="analytics-table-header">
                                    <tr>
                                        <th className="analytics-table-cell">User ID</th>
                                        <th className="analytics-table-cell">Session Cookie</th>
                                        <th className="analytics-table-cell">Total Minutes</th>
                                        <th className="analytics-table-cell">Favorite Page</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {mostActiveUsers.map((user, i) => (
                                        <tr key={i} className="analytics-table-row">
                                            <td className="analytics-table-cell">{user.userId || 'Not logged-in'}</td>
                                            <td className="analytics-table-cell">#{user.sessionCookie}</td>
                                            <td className="analytics-table-cell">{user.totalMinutes} mins</td>
                                            <td className="analytics-table-cell">{user.favouritePage}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Most Active Users</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={mostActiveUsers}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="sessionCookie"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        domain={[0, 'dataMax']}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${value} minutes spent`}
                                        labelFormatter={(label) => `Session ID #${label}`}
                                    />
                                    <Bar dataKey="totalMinutes" fill="url(#blueGradient)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Most Visited Pages</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={mostVisitedPages}
                                        dataKey="hits"
                                        nameKey="page"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={90}
                                        paddingAngle={3}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {mostVisitedPages.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={donutColors[index % 5]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => `${value} visits`}
                                        labelFormatter={(label: string) => `Page: ${label}`}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;