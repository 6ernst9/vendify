import {AddToCart, GetProductById} from "./types";
import {request} from "../../../util/request";
import {CART_BASE_URL, PRODUCTS_BASE_URL} from "../../../util/constants";

export const addToCart = async ({storeId, productId, customerId, quantity, accessToken} :AddToCart) => {
    await request({
        url: CART_BASE_URL + '/add-to-cart',
        method: 'POST',
        data: {storeId, productId, customerId, quantity},
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.add-to-cart'
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    })
}

export const getProductById = async ({ productId, accessToken }: GetProductById) => {
    try {
        const response = await request({
            url: `${PRODUCTS_BASE_URL}/get-product-by-id/${productId}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'X-FI-V-IP': '127.0.0',
                'X-FI-V-SITE-ID': 'COM',
                'X-FI-V-DEVICE': 'DESKTOP',
                'X-FI-V-PATH': 'products.get-product-by-id'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
};