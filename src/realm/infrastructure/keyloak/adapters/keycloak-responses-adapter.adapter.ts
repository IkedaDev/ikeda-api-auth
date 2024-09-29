import { ClientCredentials } from "../../../domain/entity";
import { GetClientCredentialsResponse } from "../interfaces";

export class KeycloakResponsesAdapter {
    
    
    static toGetClientCredentials(data: GetClientCredentialsResponse): ClientCredentials{
        return new ClientCredentials({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            scope: data.scope,
            tokenType: data.token_type,
        })
    }

}