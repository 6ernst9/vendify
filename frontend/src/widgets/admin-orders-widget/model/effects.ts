import {request} from "../../../util/request";
import {ACCOUNTS_BASE_URL, ORDERS_BASE_URL, STORES_BASE_URL} from "../../../util/constants";
import {setOrderItems} from "./reducers";
import {Order, OrderResponse} from "./types";
import {StoreProp} from "../../admin-store-widget/model/types";
import {setAdminStores} from "../../admin-store-widget/model/reducers";
import {Dispatch} from "redux";

export const getOrders = async (id: number, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: STORES_BASE_URL + '/get-stores-by-owner/' + id,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.getStoresByOwner',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const stores: StoreProp[] = response.data;
        dispatch(setAdminStores(stores));

        const ordersPromises = stores.map(store =>
            getOrdersByStore(store.id, accessToken)
        );

        const allOrdersArrays = await Promise.all(ordersPromises);
        const allOrders = allOrdersArrays.flat();

        dispatch(setOrderItems(allOrders));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getOrdersByStore = async (storeId: string, accessToken: string): Promise<Order[]>=> {
    return await request({
        url: ORDERS_BASE_URL + '/get-orders-by-store/' + storeId,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'orders.get-orders-by-store'
        }
    }).then(async (response) => {
        const orders: OrderResponse[] = response.data;
        const fullOrders: Order[] = await Promise.all(
            orders.map(async (orderItem) => {
                const name = await getCustomerName(orderItem.customerId, accessToken);
                return {
                    id: orderItem.id,
                    customer: name,
                    items: orderItem.items,
                    storeId: orderItem.storeId,
                    status: orderItem.status,
                    price: orderItem.price,
                    createdAt: orderItem.createdAt
                }
            }));
        return fullOrders;
    }).catch((error) => {
        console.error(error);
        return [];
    })
}

export const getCustomerName = async(customerId: number, accessToken: string): Promise<string> => {
    return await request({
        url: ACCOUNTS_BASE_URL + '/get-user-by-id/' + customerId,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-FI-V-IP': '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.get-user-by-id'
        }
    }).then((response) => {
        return response.data.firstName + ' ' + response.data.lastName;
    }).catch((error) => {
        console.error(error);
        return '';
    });
}