import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultCustomers } from "./defaultState";
import { User } from "./types";

const sessionSlice = createSlice({
    name: 'adminCustomersState',
    initialState: defaultCustomers,
    reducers: {
        setAdminCustomers: (state, action: PayloadAction<User[]>) => {
            state.customers = action.payload;
        }
    }
});

export const { setAdminCustomers } = sessionSlice.actions;
export default sessionSlice.reducer;
