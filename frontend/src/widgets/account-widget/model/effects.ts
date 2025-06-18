import {request} from "../../../util/request";
import {ORDERS_BASE_URL} from "../../../util/constants";
import {setOrderItems} from "./reducers";
import {updateActivity} from "../../../util/session";
import {GetOrders, OrderResponse} from "./types";
import {getProductById} from "../../home-widget/model/effects";

export const getOrdersByCustomer = async ({id, storeId, dispatch, accessToken} :GetOrders) => {
    await updateActivity("account", "view-account", storeId);
    await request({
        url: ORDERS_BASE_URL + '/get-orders/' + id,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.get-orders'
        }
    }).then(async (response) => {
        const orderResponse: OrderResponse[] = response.data;
        const orders = await Promise.all(
            orderResponse.map(async (order) => {
                const firstImg = await getProductById({id: order.items[0].productId, accessToken});
                return {
                    ...order,
                    img: firstImg.images[0]
                }
            }));
        dispatch(setOrderItems(orders));
    }).catch((error) => {
            console.error(error);
        })
}