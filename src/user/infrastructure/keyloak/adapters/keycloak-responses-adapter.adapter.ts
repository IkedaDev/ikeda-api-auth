import { UserInfo } from "../../../domain/entities";
import * as KeycloakInterfaces from "../interfaces";

export class KeycloakResponsesAdapter {
    
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