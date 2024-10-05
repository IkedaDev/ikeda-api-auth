import { KeycloakFetch } from "src/core/keycloak/keycloak-fetch"

export interface LoginStrategyProps {
    realm: string
    keycloakFetch: KeycloakFetch
}