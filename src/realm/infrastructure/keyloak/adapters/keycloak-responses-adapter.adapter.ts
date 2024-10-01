import { User } from "src/realm/domain/entity/user.entity";
import { ClientCredentials } from "../../../domain/entity";
import { GetClientCredentialsResponse,FindUsersResponse } from "../interfaces";

export class KeycloakResponsesAdapter {
    
    
    static toGetClientCredentials(data: GetClientCredentialsResponse): ClientCredentials{
        return new ClientCredentials({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            scope: data.scope,
            tokenType: data.token_type,
        })
    }

    static toUsers(users: FindUsersResponse[]): User[]{
        return users.map( (user)=> ({
            id: user.id,
            createdAt: user.createdTimestamp,
            email: user.email,
            emailVerified: user.emailVerified,
            enabled: user.enabled,
            firstName: user.firstName,
            lastname: user.lastName,
            totp: user.totp,
            username: user.username
        }) )
    }

}