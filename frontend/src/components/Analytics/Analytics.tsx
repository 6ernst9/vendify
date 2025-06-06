import React, {useState} from "react";
import './Analytics.css';
import {useDispatch, useSelector} from "react-redux";
import {userStoresSelect} from "../../widgets/admin-store-widget/model/selectors";
import {adminAnalyticsSelect} from "../../widgets/admin-analytics-widget/model/selectors";
import {
    getAvgSessions, getMostCartedProducts, getMostViewedProducts,
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

const Analytics: React.FC = () => {
    const stores = useSelector(userStoresSelect.stores);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const dispatch = useDispatch();
    const tabs = stores.map((store) => {
        return {id: store.id, label: store.name}
    });
    const [activeTab, setActiveTab] = useState(stores[0].id);
    const sessionPerHour = useSelector(adminAnalyticsSelect.sessionCount);
    const sessionTypes = useSelector(adminAnalyticsSelect.sessionType);
    const quickKPIs = useSelector(adminAnalyticsSelect.quickKPIs);
    const avgSession = useSelector(adminAnalyticsSelect.avgSessions);
    const mostWishlisted = useSelector(adminAnalyticsSelect.mostWishlisted);
    const mostCarted = useSelector(adminAnalyticsSelect.mostCarted);
    const mostViewedProducts = useSelector(adminAnalyticsSelect.mostViewed);

    const handleChangeStore = async (id: string) => {
        setActiveTab(id);
        await getSessionCount({accessToken, storeId: id, dispatch});
        await getQuickKPIs({accessToken, storeId: id, dispatch});
        await getAvgSessions({accessToken, storeId: id, dispatch});
        await getMostWishlistedProducts({accessToken, storeId: id, dispatch});
        await getMostViewedProducts({accessToken, storeId: id, dispatch});
        await getMostCartedProducts({accessToken, storeId: id, dispatch});
    }

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
                        <h2>Your store has no orders yet</h2>
                        <p>Once customers place orders, they’ll appear here for you to manage and fulfill.</p>
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
                                <BarChart data={avgSession}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                                    <XAxis
                                        dataKey="hour"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        tickFormatter={(h) => `${h}:00`}
                                        axisLine={false}
                                        tickLine={false}/>
                                    <YAxis
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        domain={[0, 'dataMax']}
                                        tickLine={false}/>
                                    <Tooltip
                                        formatter={(value: number) => `${value} min`}
                                        labelFormatter={(hour) => `${hour}:00`}
                                    />
                                    <Bar dataKey="avgMinutes" fill={'#1255cb'}/>
                                </BarChart>
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
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                                    <XAxis
                                        dataKey="productId"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        dataKey="count"
                                        domain={[0, 'dataMax']}
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${value} views`}
                                        labelFormatter={(label) => `Product ${label}`}
                                    />
                                    <Bar dataKey="count" fill='#1255cb'/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Most Added to Cart</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={mostCarted}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
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
                                        labelFormatter={(label) => `Product ${label}`}
                                    />
                                    <Bar dataKey="count" fill='#1255cb'/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Most Wishlisted Products</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={mostWishlisted}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
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
                                        labelFormatter={(label) => `Product ${label}`}
                                    />
                                    <Bar dataKey="count" fill='#1255cb'/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;