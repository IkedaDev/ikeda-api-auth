import { GetAccessTokenPropsRepository, GetProfilePropsRepository, GetUrlPropsRepository, GoogleAuthProviderProps } from "../../domain/interfaces";
import { SocialAuthProvider } from "../../domain/repository";
import { UUIDGenerator } from "../../../core/utils";
import { CustomError } from "../../../core/models";
import { SocialAccessToken } from "../../domain/entities";
import { GetAccessTokenGoogle } from "./interfaces";


export class GoogleAuthProvider implements SocialAuthProvider{

    private readonly clientId: string
    private readonly clientSecret: string

    constructor(props: GoogleAuthProviderProps){
        this.clientId = props.clientId
        this.clientSecret = props.clientSecret
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

    async getAccessToken(options: GetAccessTokenPropsRepository): Promise<SocialAccessToken> {
        try {
            const resp = await fetch('https://oauth2.googleapis.com/token',{
                method: 'POST',
                body:JSON.stringify({
                    grant_type:"authorization_code",
                    code:options.code,
                    client_id:this.clientId,
                    client_secret:this.clientSecret,
                    redirect_uri:options.redirectUrl
                })
            })
            const data: GetAccessTokenGoogle = await resp.json()   
            if( !data.access_token ) throw CustomError.badRequest('No se ha podido validar la autenticación')        
            return new SocialAccessToken({
                accessToken: data.access_token,
                expireIn: data.expires_in,
                scope: data.scope,
                tokenType: data.token_type
            })
        } catch (error) {
            console.error(error);
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }

    async getUserProfile(options: GetProfilePropsRepository): Promise<any> {
        throw new Error("Method not implemented.");
    }
}