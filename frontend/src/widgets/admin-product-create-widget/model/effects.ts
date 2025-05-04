import {request} from "../../../util/request";
import {PRODUCTS_BASE_URL} from "../../../util/constants";
import {ProductProps} from "./types";

export const createProduct = async ({name, store, sizes, images, description, category, price, stock, accessToken, dispatch }: ProductProps) => {
    await request({
        url: PRODUCTS_BASE_URL+ '/add-product',
        method: 'POST',
        data: {name, store, sizes, images, description, category, price, stock},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.addStore',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {

    }).catch((error) => {
        console.error("Error creating product: ", error)
    })
}