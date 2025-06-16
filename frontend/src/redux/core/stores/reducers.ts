import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultStores} from "./defaultState";
import {StoreState} from "../store/types";

const storeSlice = createSlice({
    name: 'storesState',
    initialState: defaultStores,
    reducers: {
        setStores: (state, action: PayloadAction<StoreState[]>) => {
            state.stores = action.payload;
            state.loaded = true;
        },
    }
});

export const { setStores } = storeSlice.actions;
export default storeSlice.reducer;