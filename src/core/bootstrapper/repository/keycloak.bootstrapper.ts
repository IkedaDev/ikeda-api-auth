import { KeycloakUser } from "../../../user/infrastructure";
import { KeycloakAuth, LoginAuthFactory } from "../../../auth/infrastructure";
import { KeycloakRealm } from "../../../realm/infrastructure";

import { Envs } from "../../utils";

const baseConfig = {
    url: Envs.KEYCLOAK_URL,
    realm: Envs.KEYCLOAK_REALM,
    clientId: Envs.KEYCLOAK_CLIENTID,
    clientSecret: Envs.KEYCLOAK_CLIENTSECRET,
}
export const loginAuthFactory = new LoginAuthFactory()
export const keycloakAuth = new KeycloakAuth(baseConfig)
export const keycloakUser = new KeycloakUser(baseConfig)
export const keycloakRealm = new KeycloakRealm(baseConfig)