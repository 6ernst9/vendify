import {RootState} from "../../store";

export const sessionSelect = ({
    accessToken: (state: RootState) => state.session.accessToken,
    refreshToken: (state: RootState) => state.session.refreshToken,
    id: (state: RootState) => state.session.id,
    email: (state: RootState) => state.session.email,
    firstName: (state: RootState) => state.session.firstName,
    lastName: (state: RootState) => state.session.lastName,
    phoneNumber: (state: RootState) => state.session.phoneNumber,
    exists: (state: RootState) => state.session.firstName !== ''
});