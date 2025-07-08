import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultSession } from "./defaultState";
import {UserSession} from "./types";

const getSessionKey = () => {
    const path = window.location.pathname.split('/');
    const storeId = path[1];
    return `session-${storeId}`;
};

const loadSession = () => {
    try {
        const key = getSessionKey();
        const serializedSession = localStorage.getItem(key);
        if (serializedSession === null) return defaultSession;
        return JSON.parse(serializedSession);
    } catch (e) {
        return defaultSession;
    }   
};

const sessionSlice = createSlice({
    name: 'sessionState',
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
            localStorage.setItem(getSessionKey(), JSON.stringify(state));
        },
        continueSession: (state, action: PayloadAction<UserSession>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.phoneNumber = action.payload.phoneNumber;
            state.storeId = action.payload.storeId;
            localStorage.setItem(getSessionKey(), JSON.stringify(state));
        },
        endSession: (state) => {
            localStorage.removeItem(getSessionKey());
            state.firstName = defaultSession.firstName;
            state.lastName = defaultSession.lastName;
            state.email = defaultSession.email;
            state.id = defaultSession.id;
            state.phoneNumber = defaultSession.phoneNumber;
        }
    }
});

export const { startSession, continueSession, endSession } = sessionSlice.actions;
export default sessionSlice.reducer;
