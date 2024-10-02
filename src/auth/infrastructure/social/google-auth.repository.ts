import { GetUrlPropsRepository, GoogleAuthProviderProps } from "../../domain/interfaces";
import { SocialAuthProvider } from "../../domain/repository";
import { UUIDGenerator } from "../../../core/utils";


export class GoogleAuthProvider implements SocialAuthProvider{

    private readonly clientId: string

    constructor(props: GoogleAuthProviderProps){
        this.clientId = props.clientId
    }

    getUrl(options: GetUrlPropsRepository): Promise<string> {
        const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const params = {
            redirect_uri: options.redirectUrl,
            client_id: this.clientId,
            scope: 'openid profile email',
            response_type: 'code',
            state: UUIDGenerator.v7()
        }

        const queryParams = new URLSearchParams(params)

        const fullUrl = `${baseUrl}?${queryParams.toString()}`;

        return new Promise(( resolve, _ ) => resolve(fullUrl) )
    }
    
}