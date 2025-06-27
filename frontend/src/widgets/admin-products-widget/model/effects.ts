import {request} from "../../../util/request";
import {PRODUCTS_BASE_URL, STORES_BASE_URL} from "../../../util/constants";
import {setAdminProducts} from "./reducers";
import {Product} from "./types";
import {StoreProp} from "../../admin-store-widget/model/types";
import {setAdminStores} from "../../admin-store-widget/model/reducers";
import {Dispatch} from "redux";

export const getProducts = async (id: number, accessToken: string, dispatch: Dispatch) => {
    await request({
        url: STORES_BASE_URL + '/get-stores-by-owner/' + id,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'store.getStoresByOwner',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(async (response) => {
        const stores: StoreProp[] = response.data;
        dispatch(setAdminStores(stores));

        const productPromises = stores.map((store) =>
            getProductsByStore( store.id, accessToken)
        );

        const allProductsArrays = await Promise.all(productPromises);
        const allProducts = allProductsArrays.flat();

        dispatch(setAdminProducts(allProducts));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getProductsByStore = async (store: string, accessToken: string): Promise<Product[]> => {
    return await request({
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
         return response.data;
    }).catch((error) => {
        console.log("Error fetching products: ", error);
        return [];
    })
}