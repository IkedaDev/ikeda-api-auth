import { KeycloakUser } from "../../../user/infrastructure";
import { Envs } from "../../adapters/env";

export const keycloakUser = new KeycloakUser({
    url: Envs.KEYCLOAK_URL,
    realm: Envs.KEYCLOAK_REALM,
    clientId: Envs.KEYCLOAK_CLIENTID,
    clientSecret: Envs.KEYCLOAK_CLIENTSECRET,
})