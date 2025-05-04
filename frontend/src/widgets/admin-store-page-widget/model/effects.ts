import {request} from "../../../util/request";
import {STORES_BASE_URL} from "../../../util/constants";
import {getStoreProps} from "./types";
import {setCurrentAdminStore} from "./reducers";

export const getStore = async ({id, accessToken, dispatch }: getStoreProps) => {
    await request({
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
        dispatch(setCurrentAdminStore(response.data));
    }).catch((error) => {
        console.log("Error fetching store");
    })
}