import {RootState} from "../../../redux/store";

export const adminStoreSelect = ({
    path: (state: RootState) => state.adminStore.path,
    name: (state: RootState) => state.adminStore.name,
    id: (state: RootState) => state.adminStore.id,
    theme: (state: RootState) => state.adminStore.theme,
    logo: (state: RootState) => state.adminStore.logo,
    banner: (state: RootState) => state.adminStore.banner,
    primaryColor: (state: RootState) => state.adminStore.theme.primaryColor,
    backgroundColor: (state: RootState) => state.adminStore.theme.backgroundColor,
    titleColor: (state: RootState) => state.adminStore.theme.titleColor,
    textSecondaryColor: (state: RootState) => state.adminStore.theme.textSecondaryColor,
    font: (state: RootState) => state.adminStore.theme.font,
    buttonRadius: (state: RootState) => state.adminStore.theme.buttonRadius,
    navbarStyle: (state: RootState) => state.adminStore.theme.navbarStyle,
    email: (state: RootState) => state.adminStore.contactLinks.email,
    phone: (state: RootState) => state.adminStore.contactLinks.phone,
    facebook: (state: RootState) => state.adminStore.contactLinks.facebook,
    twitter: (state: RootState) => state.adminStore.contactLinks.twitter,
    instagram: (state: RootState) => state.adminStore.contactLinks.instagram
});
