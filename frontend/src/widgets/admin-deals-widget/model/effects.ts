import {Dispatch} from "redux";
import {request} from "../../../util/request";
import {SALES_BASE_URL, STORES_BASE_URL} from "../../../util/constants";
import {setUserDeals} from "./reducers";
import {StoreProp} from "../../admin-store-widget/model/types";
import {setAdminStores} from "../../admin-store-widget/model/reducers";
import {Deal} from "../../admin-deals-create-widget/model/types";

export const getDeals = async (id: number, accessToken: string, dispatch: Dispatch) => {
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

        const dealPromises = stores.map((store) =>
            getDealsByStore( store.id, accessToken)
        );

        const allDealsArrays = await Promise.all(dealPromises);
        const allDeals = allDealsArrays.flat();

        dispatch(setUserDeals(allDeals));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getDealsByStore = async (storeId: string, accessToken: string): Promise<Deal> => {
    return await request({
        url: SALES_BASE_URL + '/get-deals/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'sales.get-deals',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        return response.data;
    }).catch((error) => {
        console.log("Error fetching stores ", error);
        return [];
    })
}