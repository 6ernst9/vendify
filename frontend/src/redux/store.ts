import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './core/session/reducers';
import adminSessionReducer from './core/adminSession/reducers';
import storeReducer from './core/store/reducers';
import authReducer from '../widgets/admin-login-widget/model/reducers';
import storesReducer from './core/stores/reducers';
import adminStoreReducer from '../widgets/admin-store-page-widget/model/reducers';
import userStoresReducer from '../widgets/admin-store-widget/model/reducers';
import userProductsReducer from '../widgets/admin-products-widget/model/reducers'
import adminOrderReducer from '../widgets/admin-orders-widget/model/reducers'
import productsReducer from '../widgets/products-browse-widget/model/reducers';
import cartReducer from '../widgets/cart-widget/model/reducers';
import adminCustomersReducer from '../widgets/admin-customers-widget/model/reducers';
import homeProductsReducer from '../widgets/home-widget/model/reducers';
import userOrdersReducer from '../widgets/account-widget/model/reducers';
import userWishlistReducer from '../widgets/wishlist-widget/model/reducers';
import adminHomeReducer from '../widgets/admin-home-widget/model/reducers';
import adminAnalyticsReducer from '../widgets/admin-analytics-widget/model/reducers';
import adminFinancesReducer from '../widgets/admin-finances-widget/model/reducers';
import currentProductReducer from '../widgets/product-widget/model/reducers';
import adminCurrentOrderReducer from '../widgets/admin-order-widget/model/reducers';
import adminCurrentProductReducer from '../widgets/admin-product-page-widget/model/reducers';
import userCurrentOrderReducer from '../widgets/order-info-widget/model/reducers';
import adminDealsReducer from '../widgets/admin-deals-widget/model/reducers';
import adminDealReducer from '../widgets/admin-deal-page-widget/model/reducers';

const rootReducer = {
    stores: storesReducer,
    store: storeReducer,
    cart: cartReducer,
    adminOrders: adminOrderReducer,
    adminStore: adminStoreReducer,
    adminCustomers: adminCustomersReducer,
    homeProducts: homeProductsReducer,
    userStores: userStoresReducer,
    userProducts: userProductsReducer,
    userWishlist: userWishlistReducer,
    userOrders: userOrdersReducer,
    products: productsReducer,
    auth: authReducer,
    adminHome: adminHomeReducer,
    session: sessionReducer,
    adminSession: adminSessionReducer,
    adminAnalytics: adminAnalyticsReducer,
    adminFinances: adminFinancesReducer,
    currentProduct: currentProductReducer,
    adminOrder: adminCurrentOrderReducer,
    userOrder: userCurrentOrderReducer,
    adminProduct: adminCurrentProductReducer,
    deals: adminDealsReducer,
    adminDeal: adminDealReducer,
}
export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
