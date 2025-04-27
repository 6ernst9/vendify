import {StoreState} from "../../../redux/core/store/types";

export const defaultStore: StoreState = {
    id: '',
    owner: 0,
    logo: '',
    banner: '',
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