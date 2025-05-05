import { RootState } from "../../store";

export const storeSelect = ({
    id: (state: RootState) => state.store.id,
    path: (state: RootState) => state.store.path,
    name: (state: RootState) => state.store.name,
    theme: (state: RootState) => state.store.theme,
    primaryColor: (state: RootState) => state.store.theme.primaryColor,
    backgroundColor: (state: RootState) => state.store.theme.backgroundColor,
    titleColor: (state: RootState) => state.store.theme.titleColor,
    textSecondaryColor: (state: RootState) => state.store.theme.textSecondaryColor,
    font: (state: RootState) => state.store.theme.font,
    buttonRadius: (state: RootState) => state.store.theme.buttonRadius,
    navbarStyle: (state: RootState) => state.store.theme.navbarStyle,
    email: (state: RootState) => state.store.contactLinks.email,
    phone: (state: RootState) => state.store.contactLinks.phone,
    facebook: (state: RootState) => state.store.contactLinks.facebook,
    twitter: (state: RootState) => state.store.contactLinks.twitter,
    instagram: (state: RootState) => state.store.contactLinks.instagram
});
