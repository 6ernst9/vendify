import {request} from "../../../util/request";
import {STORES_BASE_URL} from "../../../util/constants";
import {getStoresProps} from "./types";
import {setAdminStores} from "./reducers";

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
    }).then((response) => {
        dispatch(setAdminStores(response.data));
    }).catch((error) => {
        console.log("Error fetching stores");
    })
}