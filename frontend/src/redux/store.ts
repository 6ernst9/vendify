import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './core/session/reducers';
import adminSessionReducer from './core/adminSession/reducers';
import storeReducer from './core/store/reducers';
import authReducer from '../widgets/admin-login-widget/model/reducers';
import storesReducer from './core/stores/reducers';
import adminStoreReducer from '../widgets/admin-store-page-widget/model/reducers';
import userStoresReducer from '../widgets/admin-store-widget/model/reducers';
import userProductsReducer from '../widgets/admin-products-widget/model/reducers'
import productsReducer from '../widgets/products-browse-widget/model/reducers';
const rootReducer = {
    stores: storesReducer,
    store: storeReducer,
    adminStore: adminStoreReducer,
    userStores: userStoresReducer,
    userProducts: userProductsReducer,
    products: productsReducer,
    auth: authReducer,
    session: sessionReducer,
    adminSession: adminSessionReducer
}
export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
