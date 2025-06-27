import React, {useEffect, useState} from "react";
import './Finances.css';
import {useDispatch, useSelector} from "react-redux";
import {userStoresSelect} from "../../widgets/admin-store-widget/model/selectors";
import {adminSessionSelect} from "../../redux/core/adminSession/selectors";
import {
    getAverageOrder, getCustomerOrders, getCustomerRatio, getCustomerRevenue,
    getOrdersPerDay, getProductPerformance, getProductRevenue,
    getQuickKPIs,
    getRevenuePerDay, getTopSellingProducts
} from "../../widgets/admin-finances-widget/model/effects";
import {formatNumber} from "../../util/numbers";
import {adminFinancesSelect} from "../../widgets/admin-finances-widget/model/selectors";
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

const Finances: React.FC = () => {
    const stores = useSelector(userStoresSelect.stores);
    const accessToken = useSelector(adminSessionSelect.accessToken);
    const dispatch = useDispatch();
    const tabs = stores.map((store) => {
        return {id: store.id, label: store.name}
    });
    const [activeTab, setActiveTab] = useState('');
    const quickKPIs = useSelector(adminFinancesSelect.quickKPIs);
    const revenuePerDay = useSelector(adminFinancesSelect.revenuePerDay);
    const ordersPerDay = useSelector(adminFinancesSelect.ordersPerDay);
    const averageOrders = useSelector(adminFinancesSelect.averageOrder);
    const topSellingProducts = useSelector(adminFinancesSelect.topSellingProducts);
    const productRevenue = useSelector(adminFinancesSelect.productRevenue);
    const productPerformance = useSelector(adminFinancesSelect.productPerformance);
    const customerRevenue = useSelector(adminFinancesSelect.customerRevenue);
    const customerOrders = useSelector(adminFinancesSelect.customerOrders);
    const customerRatio = useSelector(adminFinancesSelect.customerRatio);

    const handleChangeStore = async (id: string) => {
        setActiveTab(id);
        await getQuickKPIs(id, accessToken, dispatch);
        await getAverageOrder(id, accessToken, dispatch);
        await getRevenuePerDay(id, accessToken, dispatch);
        await getOrdersPerDay(id, accessToken, dispatch);
        await getTopSellingProducts(id, accessToken, dispatch);
        await getProductRevenue(id, accessToken, dispatch);
        await getProductPerformance(id, accessToken, dispatch);
        await getCustomerRatio(id, accessToken, dispatch);
        await getCustomerOrders(id, accessToken, dispatch);
        await getCustomerRevenue(id, accessToken, dispatch);
    }

    useEffect(() => {
        if(stores.length > 0) {
            setActiveTab(stores[0].id);
        }
    }, [stores]);

    return (
        <div className="finances">
            <div className="finances-container">
                <div className='finances-header'>
                    <h1>Finances</h1>
                </div>
                <div className="finances-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleChangeStore(tab.id)}
                            className={`finances-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {stores.length === 0 && (
                    <div className="finances-empty-container">
                        <h2>Your store has no orders yet</h2>
                        <p>Once customers place orders, they’ll appear here for you to manage and fulfill.</p>
                    </div>
                )}
                <div className="finances-kpis">
                    <h2>Quick KPIs</h2>
                    <div className="finances-stats">
                        <div className="finances-single-stat-card">
                            <div className="finances-stat-card">
                                <p className="finances-stat-label">Total Revenue</p>
                                <div className="finances-stat-value-container">
                                    <p className="finances-single-stat-value">{formatNumber(quickKPIs[0])}$</p></div>
                            </div>
                        </div>
                        <div className="finances-single-stat-card">
                            <div className="finances-stat-card">
                                <p className="finances-stat-label">Today's Revenue</p>
                                <div className="finances-stat-value-container">
                                    <p className="finances-single-stat-value">{formatNumber(quickKPIs[1])}$</p>
                                </div>
                            </div>
                        </div>
                        <div className="finances-single-stat-card">
                            <div className="finances-stat-card">
                                <p className="finances-stat-label">Today's Orders</p>
                                <div className="finances-stat-value-container">
                                    <p className="finances-single-stat-value">{formatNumber(quickKPIs[2])} orders</p>
                                </div>
                            </div>
                        </div>
                        <div className="finances-single-stat-card">
                            <div className="finances-stat-card">
                                <p className="finances-stat-label">Average Order Revenue</p>
                                <div className="finances-stat-value-container">
                                    <p className="finances-single-stat-value">{formatNumber(quickKPIs[3])}$</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="analytics-kpis">
                    <h2>Revenue & Orders Insights</h2>
                    <div className="analytics-stats">
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Revenue Per Day</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={revenuePerDay}>
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
                                        dataKey="day"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                        interval="preserveEnd"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#1255cb"
                                        strokeWidth={2}
                                        fill="url(#lineGradient)"
                                        dot={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${formatNumber(value)}$`}
                                        labelFormatter={(label) => `${label}`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Orders Per Day</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={ordersPerDay}>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false}/>
                                    <XAxis
                                        dataKey="day"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        dataKey="orders"
                                        domain={[0, 'dataMax']}
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${value} orders`}
                                        labelFormatter={(label) => `${label}`}
                                    />
                                    <Bar dataKey="orders" fill="url(#blueGradient)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Average Order Value</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={averageOrders}>
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
                                        dataKey="day"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                        interval="preserveEnd"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="averageOrderValue"
                                        stroke="#1255cb"
                                        strokeWidth={2}
                                        fill="url(#lineGradient)"
                                        dot={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${formatNumber(value)}$`}
                                        labelFormatter={(label) => `${label}`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="analytics-kpis">
                    <h2>Product Performance</h2>
                    <div className="analytics-stats">
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Top Selling Products</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={topSellingProducts}>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false}/>
                                    <XAxis
                                        dataKey="productId"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        dataKey="totalSold"
                                        domain={[0, 'dataMax']}
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${value} sold`}
                                        labelFormatter={(label) => `Product ID ${label}`}
                                    />
                                    <Bar dataKey="totalSold" fill="url(#blueGradient)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Revenue by Product</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={productRevenue}
                                        dataKey="revenue"
                                        nameKey="productId"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={90}
                                        paddingAngle={3}
                                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {productRevenue.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={donutColors[index % 5]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => `${value}$`}
                                        labelFormatter={(label: number) => `Product ID ${label}`}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Product Conversion Rate</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={productPerformance}>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false}/>
                                    <XAxis
                                        dataKey="productId"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        dataKey="conversionRate"
                                        domain={[0, 'dataMax']}
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${formatNumber(value)}%`}
                                        labelFormatter={(label) => `Product ID ${label}`}
                                    />
                                    <Bar dataKey="conversionRate" fill="url(#blueGradient)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="analytics-kpis">
                    <h2>Customer Behavior</h2>
                    <div className="analytics-stats">
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Customer Ratio</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={customerRatio}
                                        dataKey="count"
                                        nameKey="type"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {customerRatio.map((_, index) => (
                                            <Cell key={`cell-${index}`}
                                                  fill={donutColors[index % 2]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Top Customers by Revenue</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={customerRevenue}>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false}/>
                                    <XAxis
                                        dataKey="customerId"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        dataKey="totalRevenue"
                                        domain={[0, 'dataMax']}
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${formatNumber(value)}$`}
                                        labelFormatter={(label) => `User ID ${label}`}
                                    />
                                    <Bar dataKey="totalRevenue" fill="url(#blueGradient)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="analytics-stat-card">
                            <p className="analytics-stat-label">Top Customers by Orders</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={customerOrders}>
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1255cb" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="#1255cb" stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false}/>
                                    <XAxis
                                        dataKey="customerId"
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        dataKey="orderCount"
                                        domain={[0, 'dataMax']}
                                        tick={{fontSize: 10, fill: "#6B7280"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => `${value}`}
                                        labelFormatter={(label) => `User ID ${label}`}
                                    />
                                    <Bar dataKey="orderCount" fill="url(#blueGradient)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Finances;