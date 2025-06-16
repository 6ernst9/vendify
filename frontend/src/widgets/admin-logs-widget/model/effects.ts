import {getProductsProps} from "../../home-widget/model/types";
import {request} from "../../../util/request";
import {ACCOUNTS_ANALYTICS_BASE_URL} from "../../../util/constants";

export const getLogs = async ({storeId, accessToken, dispatch }: getProductsProps): Promise<string[]> => {
    return await request({
        url: ACCOUNTS_ANALYTICS_BASE_URL + '/logs/' + storeId,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'analytics.get-quick-kpis',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        return response.data;
    }).catch((error) => {
        console.log("Error fetching stores ", error);
        return [];
    })
}