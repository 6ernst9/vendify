import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultSession } from "./defaultState";
import { User } from "./types";

const loadSession = () => {
    try {
        const serializedSession = localStorage.getItem('session');
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
        startSession: (state, action: PayloadAction<User>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.phoneNumber = action.payload.phoneNumber;
            localStorage.setItem('session', JSON.stringify(state));
        },
        continueSession: (state, action: PayloadAction<User>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.phoneNumber = action.payload.phoneNumber;
            localStorage.setItem('session', JSON.stringify(state));
        },
        endSession: (state) => {
            localStorage.removeItem('session');
            localStorage.removeItem('id');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('session');
            state = defaultSession
        }
    }
});

export const { startSession, continueSession, endSession } = sessionSlice.actions;
export default sessionSlice.reducer;
