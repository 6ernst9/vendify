import {createSlice} from "@reduxjs/toolkit";
import {defaultStore} from "./defaultState";

const storeSlice = createSlice({
    name: 'storeState',
    initialState: defaultStore,
    reducers: {

    }
});

export const {  } = storeSlice.actions;
export default storeSlice.reducer;