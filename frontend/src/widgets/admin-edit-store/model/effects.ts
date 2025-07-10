import {request} from "../../../util/request";
import {STORES_BASE_URL} from "../../../util/constants";
import {ContactLinks, Theme} from "../../../redux/core/store/types";

export const updateStore = async (id: string, name: string, owner: number, path: string, theme: Theme, banner: string, logo: string, contactLinks: ContactLinks, accessToken: string) => {
    await request({
        url: STORES_BASE_URL+ '/update-store',
        method: 'PUT',
        data: {id, name, owner, path, theme, banner, logo, contactLinks},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.updateStore',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.debug(response.data)
    }).catch((error) => {
        console.error(error);
    })
}

export const deleteStore = async (id: string, accessToken: string) => {
    await request({
        url: STORES_BASE_URL + '/delete-store/' + id,
        method: 'DELETE',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.deleteStore',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.debug(response.data)
    }).catch((error) => {
        console.error(error);
    })
}