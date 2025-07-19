import {Cart, CartItem} from "../../cart-widget/model/types";
import {request} from "../../../util/request";
import {CART_BASE_URL, ORDERS_BASE_URL, PRODUCTS_BASE_URL, SALES_BASE_URL} from "../../../util/constants";
import {Product} from "../../../types/products";
import {Address} from "./types";
import {updateActivity} from "../../../util/session";
import {Deal} from "../../admin-deals-create-widget/model/types";

export const placeOrder = async (customerId: number, storeId: string, coupon: string, price: number, address: Address, accessToken: string) => {
    await updateActivity("checkout", "place-order", storeId);
    await request({
        url: ORDERS_BASE_URL + '/create-order',
        method: 'POST',
        data: {customerId, storeId, coupon, price, address},
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.create-order'
        }
    }).then((response) => {
        console.error(response.data);
    }).catch((error) => {
        console.error(error);
    })
}

export const getCoupon = async (code: string, storeId: string, accessToken: string): Promise<Deal> => {
    return await request({
        url: SALES_BASE_URL + '/get-coupon/' + code + '/' + storeId,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.create-order'
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
        return null;
    })
}

export const getCart = async (customerId: number, storeId: string, accessToken: string) => {
    await updateActivity("checkout", "view-checkout", storeId);
    return await request({
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
        console.log(fullCartItems);
        return fullCartItems;
    }).catch((error) => {
        console.error(error);
        return [];
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