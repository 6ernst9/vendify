import {request} from "../../../util/request";
import {ORDERS_BASE_URL, STORES_BASE_URL} from "../../../util/constants";
import {getStoreProps, updateProps} from "./types";
import {setCurrentAdminOrder} from "./reducers";
import {StoreState} from "../../../redux/core/store/types";
import {OrderResponse} from "../../account-widget/model/types";
import {getProductById} from "../../home-widget/model/effects";

export const getOrder = async ({id, accessToken, dispatch }: getStoreProps) => {
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
        const store = await getStore({id: orderResponse.storeId, dispatch, accessToken});
        const items = await Promise.all(
            orderResponse.items.map(async (item) => {
                const product = await getProductById({id: item.productId, accessToken});
                return {
                    ...product,
                    quantity: item.quantity
                }
            })
        );

        dispatch(setCurrentAdminOrder({
            ...orderResponse,
            items,
            store: store.name
        }));
    }).catch((error) => {
        console.log("Error fetching store");
    })
}

export const updateStatus = async ({id, status, accessToken, dispatch }: updateProps) => {
    await request({
        url: ORDERS_BASE_URL + '/update-status/' + id + '/' + status,
        method: 'PUT',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.getStoresByOwner',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
       console.debug(response.data);
    }).catch((error) => {
        console.log("Error fetching store", error);
    })
}

const getStore = async ({id, accessToken, dispatch }: getStoreProps): Promise<StoreState> => {
    return await request({
        url: STORES_BASE_URL + '/get-store-by-id/' + id,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.getStoresByOwner',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log("Error fetching store");
        return null;
    })
}