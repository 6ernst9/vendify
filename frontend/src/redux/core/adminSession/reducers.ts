import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultSession } from "./defaultState";
import {User, UserSession} from "./types";

const loadSession = () => {
    try {
        const serializedSession = localStorage.getItem('adminSession');
        if (serializedSession === null) return defaultSession;
        return JSON.parse(serializedSession);
    } catch (e) {
        return defaultSession;
    }
};

const sessionSlice = createSlice({
    name: 'adminSessionState',
    initialState: loadSession(),
    reducers: {
        startSession: (state, action: PayloadAction<UserSession>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.phoneNumber = action.payload.phoneNumber;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem('adminSession', JSON.stringify(state));
        },
        continueSession: (state, action: PayloadAction<UserSession>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.phoneNumber = action.payload.phoneNumber;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem('adminSession', JSON.stringify(state));
        },
        endSession: (state) => {
            localStorage.removeItem('adminSession');
            state = defaultSession
        }
    }
});

export const { startSession, continueSession, endSession } = sessionSlice.actions;
export default sessionSlice.reducer;
