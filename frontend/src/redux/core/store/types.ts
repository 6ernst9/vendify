type Theme = {
    primaryColor: string;
    backgroundColor: string;
    titleColor: string;
    textSecondaryColor: string;
    font: string;
    buttonRadius: string;
    cardRadius: string;
    navbarStyle: 'solid' | 'blur';
};

type ContactLinks = {
    email: string;
    phone: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
};

export type StoreState = {
    id: string;
    owner: number;
    path: string;
    name: string;
    logo: string;
    banner: string;
    theme: Theme;
    contactLinks: ContactLinks;
}