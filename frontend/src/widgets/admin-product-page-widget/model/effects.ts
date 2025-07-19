import {Dispatch} from "redux";
import {request} from "../../../util/request";
import {PRODUCTS_BASE_URL} from "../../../util/constants";
import {setCurrentProduct} from "./reducers";

export const getProduct = async (productId: number, accessToken: string, dispatch: Dispatch) => {
    try {
        const response = await request({
            url: `${PRODUCTS_BASE_URL}/get-product-by-id/${productId}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'X-FI-V-IP': '127.0.0',
                'X-FI-V-SITE-ID': 'COM',
                'X-FI-V-DEVICE': 'DESKTOP',
                'X-FI-V-PATH': 'products.get-product-by-id'
            }
        });
        dispatch(setCurrentProduct(response.data));
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
};