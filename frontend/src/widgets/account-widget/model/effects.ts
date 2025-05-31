import {request} from "../../../util/request";
import {ORDERS_BASE_URL} from "../../../util/constants";
import {setOrderItems} from "./reducers";
import {getStoresProps} from "../../admin-store-widget/model/types";

export const getOrdersByCustomer = async ({id, dispatch, accessToken} :getStoresProps) => {
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
        dispatch(setOrderItems(response.data));
    }).catch((error) => {
        console.error(error);
    })
}