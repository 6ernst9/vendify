import {Dispatch} from "redux";

type Theme = {
    primaryColor: string;
    backgroundColor: string;
    titleColor: string;
    textSecondaryColor: string;
    font: string;
    buttonRadius: string;
    cardRadius: string;
    navbarStyle: string;
};

type ContactLinks = {
    email: string;
    phone: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
};

export type StoreProps = {
    path: string;
    name: string;
    theme: Theme;
    contactLinks: ContactLinks;
    banner: string;
    logo: string;
    accessToken: string;
    dispatch: Dispatch;
}