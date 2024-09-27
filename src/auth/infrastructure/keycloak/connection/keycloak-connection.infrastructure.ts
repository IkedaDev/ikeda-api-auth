import { CustomError } from "../../../../core/models"
import * as KeycloakInterfaces from "../interfaces"

export abstract class KeycloakConnection {

    private readonly _url: string 
    private readonly _clientId: string 
    private readonly _clientSecret: string 
    private readonly _realm: string 

    private _keycloakApiUrl: string = ''

    constructor(props: KeycloakInterfaces.KeycloakConnectionProps){
        this._url = props.url
        this._clientId = props.clientId
        this._clientSecret = props.clientSecret
        this._realm = props.realm
    }

    protected async token(params: URLSearchParams): Promise<KeycloakInterfaces.KeycloakLoginResponse> {
        this._keycloakApiUrl = `${this._url}/realms/${this._realm}/protocol/openid-connect/token`;
        const resp = await this.fetch(params)
        if (!resp.ok) throw CustomError.badRequest('Error en la autenticación')
        return await resp.json() as KeycloakInterfaces.KeycloakLoginResponse;
    }

    protected async introspect(params: URLSearchParams): Promise<KeycloakInterfaces.KeycloakIntrospectResponse> {
        this._keycloakApiUrl = `${this._url}/realms/${this._realm}/protocol/openid-connect/token/introspect`;
        const resp = await this.fetch(params)
        if (!resp.ok) throw CustomError.badRequest('Error en la verificacion del token')
        return await resp.json();
    }

    protected async fetch(params: URLSearchParams){
        const combinedParams = new URLSearchParams({
            'client_id': this._clientId,
            'client_secret': this._clientSecret,
        });
        params.forEach((value, key) => combinedParams.append(key, value) );
        return await fetch(this._keycloakApiUrl, {
            method: 'POST',
            body: combinedParams.toString(),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });        
    }    

}