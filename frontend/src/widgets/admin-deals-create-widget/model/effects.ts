import {request} from "../../../util/request";
import {SALES_BASE_URL} from "../../../util/constants";

export const createDeal = async (name: string, percentage: number, code: string | undefined, category: string, endDate: string, store: string, productIds: number[], accessToken: string) => {
    await request({
        url: SALES_BASE_URL + '/create-sale',
        method: 'POST',
        data: {name, percentage, code, category, endDate, store, productIds},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'sale.create-sale',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.error(error);
    })
}