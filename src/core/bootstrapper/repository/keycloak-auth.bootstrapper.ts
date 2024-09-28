import { KeycloakAuth } from "../../../auth/infrastructure";
import { Envs } from "../../adapters/env";

export const keycloakAuth = new KeycloakAuth({
    url: Envs.KEYCLOAK_URL,
    realm: Envs.KEYCLOAK_REALM,
    clientId: Envs.KEYCLOAK_CLIENTID,
    clientSecret: Envs.KEYCLOAK_CLIENTSECRET,
})