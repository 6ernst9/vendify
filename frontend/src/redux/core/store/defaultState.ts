import {StoreState} from "./types";

export const defaultStore: StoreState = {
    slug: 'exclusive',
    name: 'Exclusive',
    theme: {
        primaryColor: '#0024a7',
        backgroundColor: '#ffffff',
        titleColor: '#000',
        textSecondaryColor: '#6b7280',
        font: 'Poppins',
        buttonRadius: '20px',
        navbarStyle: 'blur'
    },
    contactLinks: {
        email: 'exclusive@gmail.com',
        phone: '+88015-88888-9999',
    },
}