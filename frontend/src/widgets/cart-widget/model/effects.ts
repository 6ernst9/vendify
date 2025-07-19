import {Cart, CartItem} from "./types";
import {request} from "../../../util/request";
import {CART_BASE_URL, PRODUCTS_BASE_URL} from "../../../util/constants";
import {Product} from "../../../types/products";
import {setCartItems} from "./reducers";
import {updateActivity} from "../../../util/session";
import {Dispatch} from "redux";

export const updateCart = async (storeId: string, productId: number, customerId: number, quantity: number, dispatch: Dispatch, accessToken: string) => {
    if(quantity === 0) {
        await updateActivity("cart", "remove-from-cart:" + productId, storeId);
    } else {
        await updateActivity("cart", "add-to-cart:" + productId, storeId);
    }

    await request({
        url: CART_BASE_URL + '/update-cart',
        method: 'PUT',
        data: {storeId, productId, customerId, quantity},
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.update-cart'
        }
    }).then((response) => {
        console.log(response.data);
        getCart(customerId, storeId, accessToken, dispatch);
    }).catch((error) => {
        console.error(error);
    })
}

export const getCart = async (customerId: number, storeId: string, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: CART_BASE_URL + '/get-cart/' + customerId,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.get-cart'
        }
    }).then(async (response) => {
        const cartItems: CartItem[] = response.data;
        const fullCartItems: Cart[] = await Promise.all(
            cartItems.map(async (cartItem) => {
                const product = await getProduct(cartItem.productId, accessToken);
                return {
                    id: cartItem.id,
                    productId: cartItem.productId,
                    quantity: cartItem.quantity,
                    storeId: cartItem.storeId,
                    name: product.name,
                    img: product.images[0],
                    price: product.price
                }
            }));
        dispatch(setCartItems(fullCartItems));
    }).catch((error) => {
        console.error(error);
        dispatch(setCartItems([]));
    })
}

export const getProduct = async(productId: number, accessToken: string): Promise<Product> => {
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