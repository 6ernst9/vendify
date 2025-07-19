import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultStores} from "./defaultState";
import {StoreProp} from "./types";

const storeSlice = createSlice({
    name: 'userStoresState',
    initialState: defaultStores,
    reducers: {
        setAdminStores: (state, action: PayloadAction<StoreProp[]>) => {
            state.stores = action.payload;
        },
    }
});

export const { setAdminStores } = storeSlice.actions;
export default storeSlice.reducer;