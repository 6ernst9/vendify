import {SALES_BASE_URL, STORES_BASE_URL} from "../../../util/constants";
import {Dispatch} from "redux";
import {setAdminDeal} from "./reducers";
import {request} from "../../../util/request";

export const getDeal = async (id: number, accessToken: string, dispatch: Dispatch) => {
    try {
        const response = await request({
            url: `${SALES_BASE_URL}/get-sale-by-id/${id}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'X-FI-V-IP': '127.0.0',
                'X-FI-V-SITE-ID': 'COM',
                'X-FI-V-DEVICE': 'DESKTOP',
                'X-FI-V-PATH': 'products.get-product-by-id'
            }
        });
        dispatch(setAdminDeal(response.data));
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
};

export const deleteSale = async (id: number, accessToken: string) => {
    await request({
        url: SALES_BASE_URL + '/delete-sale/' + id,
        method: 'DELETE',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'sales.deleteSale',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.debug(response.data)
    }).catch((error) => {
        console.error(error);
    })
}