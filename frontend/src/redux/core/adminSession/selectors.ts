import {RootState} from "../../store";

export const adminSessionSelect = ({
    accessToken: (state: RootState) => state.adminSession.accessToken,
    refreshToken: (state: RootState) => state.adminSession.refreshToken,
    id: (state: RootState) => state.adminSession.id,
    email: (state: RootState) => state.adminSession.email,
    firstName: (state: RootState) => state.adminSession.firstName,
    lastName: (state: RootState) => state.adminSession.lastName,
    phoneNumber: (state: RootState) => state.adminSession.phoneNumber,
    exists: (state: RootState) => state.adminSession.firstName !== ''
});