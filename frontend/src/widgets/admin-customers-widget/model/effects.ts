import {request} from "../../../util/request";
import {ACCOUNTS_BASE_URL, STORES_BASE_URL} from "../../../util/constants";
import {getStoresProps} from "../../admin-store-widget/model/types";
import {StoreState} from "../../../redux/core/store/types";
import {setAdminStores} from "../../admin-store-widget/model/reducers";
import {getProductsProps} from "../../admin-products-widget/model/types";
import {UserResponse} from "./types";
import {setAdminCustomers} from "./reducers";

export const getCustomers = async ({id, accessToken, dispatch }: getStoresProps) => {
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
        const stores: StoreState[] = response.data;
        dispatch(setAdminStores(stores));

        const customerPromises = stores.map(async (store) => {
            const customers = await getUsersByStore({store: store.id, accessToken});
            return customers.map((customer) => ({
                ...customer,
                store: store.name,
                lastLogged: '1min ago'
            }));
        });

        const allCustomerArrays = await Promise.all(customerPromises);
        const allCustomers = allCustomerArrays.flat();

        dispatch(setAdminCustomers(allCustomers));
    }).catch((error) => {
        console.log("Error fetching stores ", error);
    })
}

export const getUsersByStore = async ({store, accessToken }: getProductsProps): Promise<UserResponse[]> => {
    return await request({
        url: ACCOUNTS_BASE_URL + '/get-users-by-store/' + store,
        method: 'GET',
        headers: {
            'X-FI-V-IP' : '127.0.0',
            'X-FI-V-SITE-ID': 'COM',
            'X-FI-V-DEVICE': 'DESKTOP',
            'X-FI-V-PATH': 'account.get-users-by-store',
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log("Error fetching users: ", error);
        return [];
    })
}