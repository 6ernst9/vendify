export type AuthState = {
    logged: boolean;
    error: string | null;
}
export type LoginResponse = {
    id: string;
    accessToken: string;
    refreshToken: string;
}