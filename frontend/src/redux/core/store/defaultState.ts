import {StoreState} from "./types";

export const defaultStore: StoreState = {
    path: '',
    name: '',
    theme: {
        primaryColor: '',
        backgroundColor: '',
        titleColor: '',
        textSecondaryColor: '',
        font: '',
        buttonRadius: '',
        cardRadius: '',
        navbarStyle: 'solid'
    },
    contactLinks: {
        email: '',
        phone: '',
    },
}