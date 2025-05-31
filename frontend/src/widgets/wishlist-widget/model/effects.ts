import {GetCart, GetProduct, WishlistDelProps, WishlistItemResponse, WishlistProduct} from "./types";
import {request} from "../../../util/request";
import {PRODUCTS_BASE_URL, WISHLIST_BASE_URL} from "../../../util/constants";
import {Product} from "../../../types/products";
import {setWishlistItems} from "./reducers";

export const getWishlist = async ({customerId, accessToken, dispatch} :GetCart) => {
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
        const wishlistItems: WishlistProduct[] = await Promise.all(
            wishlistItemResponses.map(async (wishlistItem) => {
                const item = await getProduct({productId: wishlistItem.productId, accessToken});
                return {
                    ...item,
                    wishlistId: wishlistItem.id
                }
            }));
        dispatch(setWishlistItems(wishlistItems));
    }).catch((error) => {
        console.error(error);
    })
}

export const removeWishlist = async ({id, customerId, accessToken, dispatch} :WishlistDelProps) => {
    await request({
        url: WISHLIST_BASE_URL + '/remove-from-wishlist/' + id,
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
        getWishlist({customerId, accessToken, dispatch});
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