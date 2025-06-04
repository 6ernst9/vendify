import {RootState} from "../../../redux/store";

export const adminHomeSelect = ({
    sessionCount: (state: RootState) => state.adminHome.sessionCount,
    totalSessions: (state: RootState) => state.adminHome.totalSessions,
});
