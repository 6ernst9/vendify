import {request} from "../../../util/request";
import {ACCOUNTS_ANALYTICS_BASE_URL, PRODUCTS_BASE_URL} from "../../../util/constants";
import {
    setAvgSession, setMostActiveUsers,
    setMostCartedProducts,
    setMostViewedProducts, setMostVisitedPages, setMostWishlistedProducts,
    setQuickKPIs,
    setSessionCount,
    setSessionType
} from "./reducers";
import {AvgSessionResponse, ProductAction, SessionCountResponse, SessionRatio, SessionRatioResponse} from "./types";
import {Product} from "../../../types/products";
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

export const getAvgSessions = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-avg-duration/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-avg-duration',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const sessionCount: AvgSessionResponse[] = response.data;
        dispatch(setAvgSession(sessionCount));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getSessionRatio = async (storeId: string, accessToken: string, dispatch: Dispatch)  => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-session-ratio/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-sessions-count',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const sessionCount: SessionRatioResponse[] = response.data;
        const data: SessionRatio = {
            data: sessionCount,
            colors: ['#1255cb','#00E88F']
        }
        dispatch(setSessionType(data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getQuickKPIs = async (storeId: string, accessToken: string, dispatch: Dispatch)  => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-quick-kpis/' + storeId,
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

export const getMostVisitedPages = async (storeId: string, accessToken: string, dispatch: Dispatch)  => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-most-visited-pages/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setMostVisitedPages(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getMostActiveUsers = async (storeId: string, accessToken: string, dispatch: Dispatch)  => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-most-active-users/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setMostActiveUsers(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getMostViewedProducts = async (storeId: string, accessToken: string, dispatch: Dispatch)  => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-most-viewed-products/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-sessions-count',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const actions: ProductAction[] = response.data;
        const data = await Promise.all(actions.map(async (action) => {
            const product = await getProduct(Number(action.product), accessToken);
            return {
                productId: Number(action.product),
                name: product.name,
                count: action.count
            }
        }));
        dispatch(setMostViewedProducts(data));
    }).catch((error) => {
        console.log("Error fetching actions ", error);
    })
}

export const getMostCartedProducts = async (storeId: string, accessToken: string, dispatch: Dispatch)  => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-most-added-to-cart-products/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-sessions-count',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const actions: ProductAction[] = response.data;
        const data = await Promise.all(actions.map(async (action) => {
            const product = await getProduct(Number(action.product), accessToken);
            return {
                productId: Number(action.product),
                name: product.name,
                count: action.count
            }
        }));
        dispatch(setMostCartedProducts(data));
    }).catch((error) => {
        console.log("Error fetching actions ", error);
    })
}

export const getMostWishlistedProducts = async (storeId: string, accessToken: string, dispatch: Dispatch)  => {
    await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/get-most-added-to-wishlist-products/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-sessions-count',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const actions: ProductAction[] = response.data;
        const data = await Promise.all(actions.map(async (action) => {
            const product = await getProduct(Number(action.product), accessToken);
            return {
                productId: Number(action.product),
                name: product.name,
                count: action.count
            }
        }));
        dispatch(setMostWishlistedProducts(data));
    }).catch((error) => {
        console.log("Error fetching actions ", error);
    })
}

const getProduct = async (productId: number, accessToken: string): Promise<Product> => {
    return await request({
        url: PRODUCTS_BASE_URL + '/get-product-by-id/' + productId,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP': '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'products.get-product-by-id'
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}