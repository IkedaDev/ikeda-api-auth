export interface KeycloakResponse {
    expires_in: number;
    refresh_token: string;
    access_token: string;
    token_type: string;
}