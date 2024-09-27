
export type KeycloakIntrospectResponse = KeycloakIntrospectValidResponse | KeycloakIntrospectInvalidResponse;

export interface KeycloakIntrospectValidResponse {
    exp:                number;
    iat:                number;
    jti:                string;
    iss:                string;
    aud:                string;
    sub:                string;
    typ:                string;
    azp:                string;
    sid:                string;
    acr:                string;
    "allowed-origins":  string[];
    realm_access:       RealmAccess;
    resource_access:    ResourceAccess;
    scope:              string;
    email_verified:     boolean;
    name:               string;
    preferred_username: string;
    given_name:         string;
    family_name:        string;
    email:              string;
    client_id:          string;
    username:           string;
    token_type:         string;
    active:             true;  
}

export interface KeycloakIntrospectInvalidResponse {
    active: false;  
}

interface RealmAccess {
    roles: string[];
}

interface ResourceAccess {
    account: RealmAccess;
}
