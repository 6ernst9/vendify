import {request} from "../../../util/request";
import {STORES_BASE_URL} from "../../../util/constants";
import {ContactLinks, Theme} from "../../../redux/core/store/types";

export const createStore = async (name: string, owner: number, path: string, theme: Theme, banner: string, logo: string, contactLinks: ContactLinks, accessToken: string) => {
    await request({
        url: STORES_BASE_URL+ '/add-store',
        method: 'POST',
        data: {name, owner, path, theme, banner, logo, contactLinks},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.addStore',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.debug(response.data)
    }).catch((error) => {
        console.error(error);
    })
}