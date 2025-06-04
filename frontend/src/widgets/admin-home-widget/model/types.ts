export interface SessionCount {
    label: string;
    value: number;
}

export interface SessionCountResponse {
    hour: number;
    sessionCount: number;
}

export interface AdminHomeState {
    sessionCount: SessionCount[];
    totalSessions: number;
}