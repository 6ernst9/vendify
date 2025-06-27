import {request} from "../../../util/request";
import {ORDERS_BASE_URL} from "../../../util/constants";
import {setCurrentOrder} from "./reducers";
import {OrderResponse} from "../../account-widget/model/types";
import {getProductById} from "../../home-widget/model/effects";
import {updateActivity} from "../../../util/session";
import {Dispatch} from "redux";
import {RateItem} from "./types";

export const getOrder = async (id: string, storeId: string, accessToken: string, dispatch: Dispatch) => {
    await updateActivity("order:" + id, "view-order:" + id, storeId);
    await request({
        url: ORDERS_BASE_URL + '/get-order-by-id/' + id,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.getStoresByOwner',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const orderResponse: OrderResponse = response.data;
        const items = await Promise.all(
            orderResponse.items.map(async (item) => {
                const product = await getProductById(item.productId, accessToken);
                return {
                    ...product,
                    quantity: item.quantity
                }
            })
        );

        dispatch(setCurrentOrder({
            ...orderResponse,
            items
        }));
    }).catch((error) => {
        console.log("Error fetching store", error);
    })
}

export const rateOrder = async (rate: RateItem[], accessToken: string, orderId: string) => {
    await request({
        url: ORDERS_BASE_URL + '/rate-order/' + orderId,
        method: 'POST',
        data: rate,
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.getStoresByOwner',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
       console.debug(response.data)
    }).catch((error) => {
        console.log("Error rating order", error);
    })
}