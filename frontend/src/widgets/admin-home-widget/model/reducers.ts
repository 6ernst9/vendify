import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultState} from "./defaultState";
import {SessionCount} from "./types";

const adminHomeSlice = createSlice({
    name: 'adminHomeState',
    initialState: defaultState,
    reducers: {
        setSessionCount: (state, action: PayloadAction<SessionCount[]>) => {
            state.sessionCount = action.payload;
        },
        setTotalSessions: (state, action: PayloadAction<number>) => {
            state.totalSessions = action.payload;
        }
    }
});

export const { setSessionCount, setTotalSessions } = adminHomeSlice.actions;
export default adminHomeSlice.reducer;