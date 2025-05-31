import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultStore} from "./defaultState";
import {StoreState} from "./types";

const storeSlice = createSlice({
    name: 'storeState',
    initialState: defaultStore,
    reducers: {
        setCurrentStore: (state, action: PayloadAction<StoreState>) => {
            state.banner = action.payload.banner;
            state.logo = action.payload.logo;
            state.owner = action.payload.owner;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.path = action.payload.path;
            state.categories = action.payload.categories;
            state.theme = action.payload.theme;
            state.contactLinks = action.payload.contactLinks;
        }
    }
});

export const { setCurrentStore } = storeSlice.actions;
export default storeSlice.reducer;