import {request} from "../../../util/request";
import {CART_BASE_URL, PRODUCTS_BASE_URL, WISHLIST_BASE_URL} from "../../../util/constants";
import {updateActivity} from "../../../util/session";
import {getWishlist} from "../../wishlist-widget/model/effects";
import {getCart} from "../../cart-widget/model/effects";
import {setProduct, setRelatedItems} from "./reducers";
import {Dispatch} from "redux";

export const addToCart = async (storeId: string, productId: number, customerId: number, quantity: number, dispatch: Dispatch, accessToken: string) => {
    await updateActivity("product:" + productId, "add-to-cart:" + productId, storeId);
    await request({
        url: CART_BASE_URL + '/add-to-cart',
        method: 'POST',
        data: {storeId, productId, customerId, quantity},
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'cart.add-to-cart'
        }
    }).then((response) => {
        console.debug(response.data);
        getCart(customerId, storeId, accessToken, dispatch);
    }).catch((error) => {
        console.error(error);
    })
}

export const addToWishlist = async (storeId: string, productId: number, customerId: number, accessToken: string, dispatch: Dispatch) => {
    await updateActivity("product:" + productId, "add-to-wishlist:"+ productId, storeId);
    await request({
        url: WISHLIST_BASE_URL + '/add-to-wishlist',
        method: 'POST',
        data: {storeId, productId, customerId},
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'wishlist.add-to-wishlist'
        }
    }).then(() => {
        getWishlist(customerId, storeId, accessToken, dispatch);
    }).catch((error) => {
        console.error(error);
    })
}

export const getProductById = async (productId: number, storeId: string, accessToken: string, dispatch: Dispatch) => {
    await updateActivity("product:" + productId, "view-product:" + productId, storeId)
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
        dispatch(setProduct(response.data));
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
};

export const getRelatedProducts = async (productId: number, accessToken: string, dispatch: Dispatch) => {
    try {
        const response = await request({
            url: `${PRODUCTS_BASE_URL}/get-related-products/${productId}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'X-FI-V-IP': '127.0.0',
                'X-FI-V-SITE-ID': 'COM',
                'X-FI-V-DEVICE': 'DESKTOP',
                'X-FI-V-PATH': 'products.get-product-by-id'
            }
        });
        dispatch(setRelatedItems(response.data));
    } catch (error) {
        console.error("Failed to fetch product:", error);
        dispatch(setRelatedItems([]));
    }
};