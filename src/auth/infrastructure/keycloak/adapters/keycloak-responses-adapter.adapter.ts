import { InvalidTokenStatus, LoginUser, UserInfo, ValidTokenStatus } from "../../../domain/entities";
import * as KeycloakInterfaces from "../interfaces";


export class KeycloakResponsesAdapter {
    
    static toLoginUser(data: KeycloakInterfaces.KeycloakLoginResponse): LoginUser {
        return new LoginUser({
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            accessToken: data.access_token,
            tokenType: data.token_type,
        });
    }

    static toValidTokenStatus(data: KeycloakInterfaces.KeycloakIntrospectValidResponse): ValidTokenStatus{
        return new ValidTokenStatus({
            "allowed-origins": data["allowed-origins"],
            acr: data.acr,
            aud: data.aud,
            azp: data.azp,
            client_id: data.client_id,
            email: data.email,
            email_verified: data.email_verified,
            exp: data.exp,
            family_name: data.family_name,
            given_name: data.given_name,
            iat: data.iat,
            iss: data.iss,
            jti: data.jti,
            name: data.name,
            preferred_username: data.preferred_username,
            realm_access: {roles: data.realm_access.roles},
            resource_access: {account:{roles: data.resource_access.account.roles}},
            scope: data.scope,
            sid: data.sid,
            status: data.active,
            sub: data.sub,
            token_type: data.token_type,
            typ: data.typ,
            username: data.username
        })
    }

    static toInValidTokenStatus(data: KeycloakInterfaces.KeycloakIntrospectInvalidResponse): InvalidTokenStatus{
        return new InvalidTokenStatus({
            status: data.active
        })
    }

    static toUserInfo(userInfo: KeycloakInterfaces.KeycloakUserInfoResponse): UserInfo {
        return new UserInfo({
            email: {
                email: userInfo.email,
                verified: userInfo.email_verified
            },
            familyName: userInfo.family_name,
            givenName: userInfo.given_name,
            name: userInfo.name,
            preferredUsername: userInfo.preferred_username,
            sub: userInfo.sub
        })
    }
}