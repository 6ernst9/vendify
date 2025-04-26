import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './core/session/reducers';
import storeReducer from './core/store/reducers';
import authReducer from '../widgets/admin-login-widget/model/reducers';
import storesReducer from './core/stores/reducers';

const rootReducer = {
    stores: storesReducer,
    store: storeReducer,
    auth: authReducer,
    session: sessionReducer,

}
export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
