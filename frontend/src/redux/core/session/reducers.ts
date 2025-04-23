import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultSession} from "./defaultState";
import {User} from "./types";

const sessionSlice = createSlice({
    name: 'sessionState',
    initialState: defaultSession,
    reducers: {
        startSession: (state, action: PayloadAction<User>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.phoneNumber = action.payload.phoneNumber;
        },
        continueSession: (state, action: PayloadAction<User>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.phoneNumber = action.payload.phoneNumber;
        },
        endSession: (state) => {
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