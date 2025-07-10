import {request} from "../../../util/request";
import {ACCOUNTS_BASE_URL} from "../../../util/constants";

export const updateAccount = async (id: number, firstName: string, lastName: string, email: string, phoneNumber: string, accessToken: string) => {
    await request({
        url: ACCOUNTS_BASE_URL+ '/update-user',
        method: 'PUT',
        data: {id, firstName, lastName, email, phoneNumber, storeId: 0},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.update-user',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.debug(response.data)
    }).catch((error) => {
        console.error(error);
    })
}