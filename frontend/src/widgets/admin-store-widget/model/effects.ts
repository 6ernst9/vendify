import {request} from "../../../util/request";
import {STORES_BASE_URL} from "../../../util/constants";
import {getStoresProps} from "./types";
import {setAdminStores} from "./reducers";
import {StoreState} from "../../../redux/core/store/types";
import {getUsersByStore} from "../../admin-customers-widget/model/effects";
import {getOrdersByStore} from "../../admin-orders-widget/model/effects";

export const getStores = async ({id, accessToken, dispatch }: getStoresProps) => {
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
        const stores: StoreState[] = response.data;
        const storesProps = await Promise.all(
            stores.map(async (storeProp) => {
                const users = await getUsersByStore({accessToken, store: storeProp.id});
                const orders = await getOrdersByStore({accessToken, storeId: storeProp.id});
                return {
                    ...storeProp,
                    customers: users.length,
                    orderNo: orders.length,
                    revenue: orders.reduce((sum, order) => sum + order.price, 0)
                }
            }));
        dispatch(setAdminStores(storesProps));
    }).catch((error) => {
        console.log("Error fetching stores", error);
    })
}