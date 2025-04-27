import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultStores} from "./defaultState";
import {StoreState} from "../../../redux/core/store/types";

const storeSlice = createSlice({
    name: 'userStoresState',
    initialState: defaultStores,
    reducers: {
        setAdminStores: (state, action: PayloadAction<StoreState[]>) => {
            state.stores = action.payload;
        },
    }
});

export const { setAdminStores } = storeSlice.actions;
export default storeSlice.reducer;