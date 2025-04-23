import {UserSession} from "./types";

export const defaultSession: UserSession = {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    id: localStorage.getItem( 'id') || '',
    phoneNumber: ''
}