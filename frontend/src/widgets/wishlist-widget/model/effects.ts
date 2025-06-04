import {GetCart, GetProduct, WishlistDelProps, WishlistItemResponse} from "./types";
import {request} from "../../../util/request";
import {PRODUCTS_BASE_URL, WISHLIST_BASE_URL} from "../../../util/constants";
import {Product} from "../../../types/products";
import {setWishlistItems} from "./reducers";
import {updateActivity} from "../../../util/session";

export const getWishlist = async ({customerId, storeId, accessToken, dispatch} :GetCart) => {
    await updateActivity("wishlist", storeId);
    await request({
        url: WISHLIST_BASE_URL + '/get-wishlist/' + customerId,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'wishlist.get-wishlist'
        }
    }).then(async (response) => {
        const wishlistItemResponses: WishlistItemResponse[] = response.data;
        const wishlistItems: Product[] = await Promise.all(
            wishlistItemResponses.map(async (wishlistItem) => {
                return await getProduct({productId: wishlistItem.productId, accessToken});
            }));
        dispatch(setWishlistItems(wishlistItems));
    }).catch((error) => {
        console.error(error);
    })
}

export const removeFromWishlist = async ({storeId, customerId, productId, accessToken, dispatch} :WishlistDelProps) => {
    await updateActivity("wishlist", storeId)
    await request({
        url: WISHLIST_BASE_URL + '/remove-from-wishlist/' + customerId + '/' + storeId + '/' + productId,
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'wishlist.remove-from-wishlist'
        }
    }).then((response) => {
        console.log(response.data);
        getWishlist({customerId, accessToken, storeId, dispatch});
    }).catch((error) => {
        console.error(error);
    });
}

export const getProduct = async({productId, accessToken}: GetProduct): Promise<Product> => {
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