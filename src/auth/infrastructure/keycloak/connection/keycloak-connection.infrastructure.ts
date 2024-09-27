import { CustomError } from "../../../../core/models"
import { KeycloakConnectionProps, KeycloakResponse } from "../interfaces"

export abstract class KeycloakConnection {

    private readonly _url: string 
    private readonly _clientId: string 
    private readonly _clientSecret: string 
    private readonly _realm: string 

    constructor(props: KeycloakConnectionProps){
        this._url = props.url
        this._clientId = props.clientId
        this._clientSecret = props.clientSecret
        this._realm = props.realm
    }

    protected async fetchToken(params: URLSearchParams): Promise<KeycloakResponse> {
        const tokenUrl = `${this._url}/realms/${this._realm}/protocol/openid-connect/token`;

        const combinedParams = new URLSearchParams({
            'client_id': this._clientId,
            'client_secret': this._clientSecret,
        });
        params.forEach((value, key) => combinedParams.append(key, value) );

        const resp = await fetch(tokenUrl, {
            method: 'POST',
            body: combinedParams.toString(),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (!resp.ok) throw CustomError.badRequest('Error en la autenticación')

        return await resp.json() as KeycloakResponse;
    }



}