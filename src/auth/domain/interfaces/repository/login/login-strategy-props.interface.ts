import { KeycloakFetch } from "src/core/keycloak/keycloak-fetch"

export interface TokenExchangeLoginStrategyProps extends LoginStrategyProps {}

export interface PasswordLoginStrategyProps extends LoginStrategyProps {}

export interface LoginStrategyProps {
    realm: string
    keycloakFetch: KeycloakFetch
}