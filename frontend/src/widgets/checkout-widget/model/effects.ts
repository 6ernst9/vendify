import {Cart, CartItem, GetCart, GetProduct} from "../../cart-widget/model/types";
import {request} from "../../../util/request";
import {CART_BASE_URL, ORDERS_BASE_URL, PRODUCTS_BASE_URL} from "../../../util/constants";
import {Product} from "../../../types/products";
import {PlaceOrder} from "./types";
import {updateActivity} from "../../../util/session";

export const placeOrder = async ({customerId, storeId, price, address, accessToken}: PlaceOrder) => {
    await updateActivity("checkout", "place-order", storeId);
    await request({
        url: ORDERS_BASE_URL + '/create-order',
        method: 'POST',
        data: {customerId, storeId, price, address},
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
export const getCart = async ({customerId, storeId, accessToken} :GetCart) => {
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
                const product = await getProduct({productId: cartItem.productId, accessToken});
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
        return fullCartItems;
    }).catch((error) => {
        console.error(error);
        return [];
    })
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