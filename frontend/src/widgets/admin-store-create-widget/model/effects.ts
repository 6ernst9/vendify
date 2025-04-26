import {request} from "../../../util/request";
import {STORES_BASE_URL} from "../../../util/constants";
import {StoreProps} from "./types";

export const createStore = async ({name, path, theme, banner, logo, contactLinks, accessToken, dispatch }: StoreProps) => {
    await request({
        url: STORES_BASE_URL+ '/add-store',
        method: 'POST',
        data: {name, path, theme, banner, logo, contactLinks},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.addStore',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {

    }).catch((error) => {

    })
}