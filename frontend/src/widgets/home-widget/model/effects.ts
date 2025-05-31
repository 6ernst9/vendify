import {request} from "../../../util/request";
import {ORDERS_BASE_URL, PRODUCTS_BASE_URL} from "../../../util/constants";
import {setBestSellingProducts, setNewProducts, setSaleProducts} from "./reducers";
import {getProductProps, getProductsProps, Product} from "./types";

export const getDiscountedProducts = async ({storeId, accessToken, dispatch }: getProductsProps) => {
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
        dispatch(setSaleProducts(response.data));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getNewestProducts = async ({storeId, accessToken, dispatch }: getProductsProps) => {
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

export const getBestSellingProducts = async ({storeId, accessToken, dispatch }: getProductsProps) => {
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
                return await getProductById({ id: productId, accessToken });
            })
        );
        dispatch(setBestSellingProducts(products));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getProductById = async ({id, accessToken}: getProductProps): Promise<Product> => {
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