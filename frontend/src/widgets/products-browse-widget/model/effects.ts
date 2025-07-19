import {request} from "../../../util/request";
import {PRODUCTS_BASE_URL} from "../../../util/constants";
import {setPreloaded, setProducts} from "./reducers";
import {updateActivity} from "../../../util/session";
import {Dispatch} from "redux";

export const getAllProducts = async (store: string, accessToken: string, dispatch: Dispatch) => {
    await updateActivity("browse", "view-all-products", store);
    await request({
        url: PRODUCTS_BASE_URL + '/get-products-by-store/' + store,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.getStoresByOwner',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        dispatch(setProducts(response.data));
    }).catch((error) => {
        console.log("Error fetching products: ", error);
        dispatch(setPreloaded(true));
    })
}