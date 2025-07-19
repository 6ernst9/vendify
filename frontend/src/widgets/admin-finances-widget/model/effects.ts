import {request} from "../../../util/request";
import {ACCOUNTS_ANALYTICS_BASE_URL, ORDERS_ANALYTICS_BASE_URL} from "../../../util/constants";
import {
    setAverageOrderTrend, setCustomerOrders, setCustomerRatio, setCustomerRevenue,
    setOrdersPerDay,
    setProductPerformance, setProductRevenue,
    setQuickKPIs,
    setRevenuePerDay,
    setTopSellingProducts
} from "./reducers";
import {ProductPerformance, ProductSalesMetrics, ProductViewsMetrics} from "./types";
import {Dispatch} from "redux";

export const getQuickKPIs = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-quick-kpis/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setQuickKPIs(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getAverageOrder = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-average-order-value/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setAverageOrderTrend(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getRevenuePerDay =  async (storeId: string, accessToken: string, dispatch: Dispatch)=> {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-revenue-per-day/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setRevenuePerDay(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getOrdersPerDay =  async (storeId: string, accessToken: string, dispatch: Dispatch)=> {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-orders-per-day/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setOrdersPerDay(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getTopSellingProducts =  async (storeId: string, accessToken: string, dispatch: Dispatch)=> {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-top-selling-products/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setTopSellingProducts(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getCustomerRatio =  async (storeId: string, accessToken: string, dispatch: Dispatch)=> {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-customer-ratio/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setCustomerRatio(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getCustomerOrders =  async (storeId: string, accessToken: string, dispatch: Dispatch)=> {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-customer-orders/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setCustomerOrders(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getCustomerRevenue =  async (storeId: string, accessToken: string, dispatch: Dispatch)=> {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-customer-revenue/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setCustomerRevenue(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getProductRevenue =  async (storeId: string, accessToken: string, dispatch: Dispatch)=> {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-product-revenue/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setProductRevenue(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getProductPerformance = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    try {
        const [viewsRes, salesRes] = await Promise.all([
            request<ProductViewsMetrics[]>({
                url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-most-viewed-products/' + storeId,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'X-FI-V-IP' : '127.0.0',
                    'X-FI-V-SITE-ID': 'COM',
                    'X-FI-V-DEVICE': 'DESKTOP',
                    'X-FI-V-PATH': 'analytics.get-quick-kpis',
                },
            }),
            request<ProductSalesMetrics[]>({
                url: ORDERS_ANALYTICS_BASE_URL + '/get-product-conversion/' + storeId,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'X-FI-V-IP' : '127.0.0',
                    'X-FI-V-SITE-ID': 'COM',
                    'X-FI-V-DEVICE': 'DESKTOP',
                    'X-FI-V-PATH': 'analytics.get-quick-kpis',
                },
            }),
        ]);

        const viewsMap = new Map(
            viewsRes.data.map((v) => [Number(v.product), v.count])
        );
        const salesMap = new Map(
            salesRes.data.map((s) => [Number(s.productId), s])
        );

        const allProductIds = new Set([
            ...viewsRes.data.map((v) => v.product.toString()),
            ...salesRes.data.map((s) => s.productId.toString()),
        ]);

        const performance: ProductPerformance[] = [];

        allProductIds.forEach((product) => {
            const productId = Number(product);
            const views = viewsMap.get(productId) || 0;
            const sales = salesMap.get(productId);
            const totalSold = sales?.totalSold || 0;
            const revenue = sales?.revenue || 0;
            const conversionRate = views > 0 ? totalSold / views * 100 : 0;

            performance.push({ productId, views, totalSold, revenue, conversionRate });
        });

        dispatch(setProductPerformance(performance));
    } catch (error) {
        console.error('Error fetching product performance:', error);
    }
};