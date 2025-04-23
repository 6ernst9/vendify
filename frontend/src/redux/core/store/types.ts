type Theme = {
    primaryColor: string;
    backgroundColor: string;
    titleColor: string;
    textSecondaryColor: string;
    font: string;
    buttonRadius: string;
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
    slug: string;
    name: string;
    theme: Theme;
    contactLinks: ContactLinks;
}