import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultStore} from "./defaultState";
import {StoreState} from "../../../redux/core/store/types";

const storeSlice = createSlice({
    name: 'adminStore',
    initialState: defaultStore,
    reducers: {
        setCurrentAdminStore: (state, action: PayloadAction<StoreState>) => {
            state.id = action.payload.id;
            state.logo = action.payload.banner;
            state.banner = action.payload.banner;
            state.name = action.payload.name;
            state.categories = action.payload.categories;
            state.path = action.payload.path;
            state.theme = action.payload.theme;
            state.contactLinks = action.payload.contactLinks;
        }
    }
});

export const { setCurrentAdminStore } = storeSlice.actions;
export default storeSlice.reducer;