import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultSession } from "./defaultState";
import {UserSession} from "../session/types";

const loadSession = () => {
    try {
        const serializedSession = localStorage.getItem('admin-session');
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
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.phoneNumber = action.payload.phoneNumber;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.storeId = action.payload.storeId;
            localStorage.setItem('admin-session', JSON.stringify(state));
        },
        continueSession: (state, action: PayloadAction<UserSession>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.phoneNumber = action.payload.phoneNumber;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.storeId = action.payload.storeId;
            localStorage.setItem('admin-session', JSON.stringify(state));
        },
        endSession: (state) => {
            localStorage.removeItem('admin-session');
            localStorage.removeItem('X-FI-V-SESSION-ID-0');
            state.accessToken = defaultSession.accessToken;
            state.refreshToken = defaultSession.refreshToken;
            state.id = defaultSession.id;
            state.email = defaultSession.email;
            state.phoneNumber = defaultSession.phoneNumber;
            state.firstName = defaultSession.firstName;
            state.lastName = defaultSession.lastName;
        }
    }
});

export const { startSession, continueSession, endSession } = sessionSlice.actions;
export default sessionSlice.reducer;
