import {request} from "../../../util/request";
import {PRODUCTS_BASE_URL} from "../../../util/constants";

export const updateProduct = async (id: number, name: string, store: string, images: string[], description: string, category: string, price: number, stock: number, accessToken: string) => {
    await request({
        url: PRODUCTS_BASE_URL+ '/update-product',
        method: 'PUT',
        data: {id, name, store, images, description, category, price, stock},
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'product.updateProduct',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.debug(response.data);
    }).catch((error) => {
        console.error("Error creating product: ", error)
    })
}

export const deleteProduct = async (id: number, accessToken: string) => {
    await request({
        url: PRODUCTS_BASE_URL+ '/delete-product/' + id,
        method: 'DELETE',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'product.deleteProduct',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.debug(response.data);
    }).catch((error) => {
        console.error("Error deleting product: ", error)
    })
}