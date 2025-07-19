import {request} from "../../../util/request";
import {ACCOUNTS_ANALYTICS_BASE_URL, ORDERS_ANALYTICS_BASE_URL, ORDERS_BASE_URL} from "../../../util/constants";
import {setQuickKPIs, setRecentOrders, setSessionCount, setTopProducts, setTotalSessions} from "./reducers";
import {SessionCountResponse} from "./types";
import {Dispatch} from "redux";

export const getSessionCount = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-sessions-per-hour/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-sessions-count',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const sessionCount: SessionCountResponse[] = response.data;
        const data = sessionCount.map((session) => {
            return {
                label: session.hour + ":00",
                value: session.sessionCount
            }
        });
        dispatch(setSessionCount(data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getTotalSessions = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-sessions-today/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-sessions-count',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setTotalSessions(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getTopSellingProducts = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
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
        dispatch(setTopProducts(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getOrdersByStore = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
     await request({
        url: ORDERS_BASE_URL + '/get-orders-by-store/' + storeId,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.get-orders-by-store'
        }
    }).then(async (response) => {
        dispatch(setRecentOrders(response.data));
    }).catch((error) => {
        console.error(error);
        dispatch(setRecentOrders([]));
    })
}

export const getHomeKPIs = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: ORDERS_ANALYTICS_BASE_URL + '/get-home-kpis/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-home-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setQuickKPIs(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}