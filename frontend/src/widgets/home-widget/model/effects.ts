import {request} from "../../../util/request";
import {ORDERS_BASE_URL, PRODUCTS_BASE_URL, SALES_BASE_URL} from "../../../util/constants";
import {setBestSellingProducts, setNewProducts, setSaleProducts} from "./reducers";
import {updateActivity} from "../../../util/session";
import {Product} from "../../../types/products";
import {Deal} from "../../admin-deals-create-widget/model/types";
import {Dispatch} from "redux";

export const getDiscountedProducts = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await updateActivity("home", "view-home", storeId);
    await request({
        url: PRODUCTS_BASE_URL + '/get-discounted-products/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'products.get-discounted-products',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const products: Product[] = response.data;
        const deal = await getDiscount(storeId, accessToken);
        dispatch(setSaleProducts({
            products, sale: deal
        }));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getDiscount = async (storeId: string, accessToken: string) : Promise<Deal> => {
    return await request({
        url: SALES_BASE_URL + '/get-sales/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'products.get-discounted-products',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        return response.data;
    }).catch((error) => {
        console.log("Error fetching sale ", error);
        return null;
    })
}

export const getNewestProducts = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: PRODUCTS_BASE_URL + '/get-newest-products/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'products.get-newest-products',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        dispatch(setNewProducts(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getBestSellingProducts = async (storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: ORDERS_BASE_URL + '/get-best-selling-orders/' + storeId + '/6',
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.get-best-selling-orders',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const ids: number[] = response.data;
        const products = await Promise.all(
            ids.map(async (productId) => {
                return await getProductById(productId, accessToken);
            })
        );
        dispatch(setBestSellingProducts(products));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
        dispatch(setBestSellingProducts([]));
    })
}

export const getProductById = async (id: number, accessToken: string): Promise<Product> => {
    return await request({
        url: PRODUCTS_BASE_URL + '/get-product-by-id/' + id,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'products.get-product-by-id',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log("Error fetching product ", error);
    })
}