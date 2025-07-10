import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {defaultAuth} from "./defaultState";
import {LoginResponse} from "./types";

const loginSlice = createSlice({
    name: 'authState',
    initialState: defaultAuth,
    reducers: {
        loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
           state.logged = true;
           state.error = 'NO-ERROR';
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.logged = false;
            if(action.payload.includes('Incorrect password')){
                state.error = 'Incorrect password';
            } else if(action.payload.includes('Invalid email or phone number')){
                state.error = 'Invalid email or phone number';
            } else {
                state.error = 'Something went wrong'
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.logged = false;
            state.error = action.payload;
        },
        changePage: (state) => {
            state.error = ''
        },
        registrationSuccess: (state,action: PayloadAction<LoginResponse>) => {
            state.logged = true;
            state.error = 'NO-ERROR';
        },
        registrationFailure: (state, action: PayloadAction<string>) => {
            state.logged = false;
            if(action.payload.includes('Email or phone number already used by another account')){
                state.error = 'Email or phone number already used by another account';
            } else if(action.payload.includes('Password is required')){
                state.error = 'Password is required';
            } else if(action.payload.includes('Password must be at least 8 characters long')) {
                state.error = 'Password must be at least 8 characters long';
            } else if(action.payload.includes('Email is required')){
                state.error = 'Email is required';
            } else if(action.payload.includes('Invalid email')){
                state.error = 'Invalid email';
            } else if(action.payload.includes('Phone number is required')){
                state.error = 'Phone number is required';
            } else if(action.payload.includes('Invalid phone number')){
                state.error = 'Invalid phone number';
            } else if(action.payload.includes('Full name is required')){
                state.error = 'Full name is required';
            } else {
                state.error = 'Something went wrong';
            }
        },
        logout: (state) => {
            state.error = defaultAuth.error;
            state.logged = defaultAuth.logged;
        }
    }
});

export const { loginSuccess, registrationSuccess, registrationFailure, loginFailure, changePage, logout, setError } = loginSlice.actions;
export default loginSlice.reducer;