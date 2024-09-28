import { LogoutRequestDto } from "src/auth/domain/dtos"
import { CustomError } from "../../../../core/models"
import * as KeycloakInterfaces from "../interfaces"

export abstract class KeycloakConnection {

    private readonly _url: string 
    private readonly _clientId: string 
    private readonly _clientSecret: string 
    private readonly _realm: string 

    constructor(props: KeycloakInterfaces.KeycloakConnectionProps){
        this._url = props.url
        this._clientId = props.clientId
        this._clientSecret = props.clientSecret
        this._realm = props.realm
    }

    protected async _token(params: URLSearchParams): Promise<KeycloakInterfaces.KeycloakLoginResponse> {
        const resp = await this._fetch().token(params)
        if (!resp.ok) throw CustomError.badRequest('Error en la autenticación')
        return await resp.json() as KeycloakInterfaces.KeycloakLoginResponse;
    }

    protected async _introspect(params: URLSearchParams): Promise<KeycloakInterfaces.KeycloakIntrospectResponse> {
        const resp = await this._fetch().introspect(params)
        if (!resp.ok) throw CustomError.badRequest('Error en la verificacion del token')
        return await resp.json();
    }

    protected async _logout(logoutDto: LogoutRequestDto): Promise<boolean> {
        const resp = await this._fetch().logout(logoutDto)
        return resp.ok;
    }

    protected async _userInfo(accessToken: string): Promise<KeycloakInterfaces.KeycloakUserInfoResponse> {
        const resp = await this._fetch().userinfo(accessToken)
        if (!resp.ok) throw CustomError.badRequest('Error al obtener la informacion del usuario')
        return await resp.json();
    }

    private _fetch(){
        const self = this

        function hasHeaders(headers?: HeadersInit): boolean {
            if (!headers) return false;
            const normalizedHeaders = new Headers(headers);
            return normalizedHeaders.keys().next().done === false;
        }

        const post = async ( { service, params, headers }: { service:string, params ?:URLSearchParams, headers ?: HeadersInit }  ) => {
            let headersTosend:HeadersInit = { 'Content-Type': 'application/x-www-form-urlencoded' }
            const combinedParams = new URLSearchParams({
                'client_id': this._clientId,
                'client_secret': this._clientSecret,
            });
            if(params && params.toString().length > 0){
                params.forEach((value, key) => combinedParams.append(key, value) );
            }
            if(hasHeaders(headers)) headersTosend = headers!
            return await fetch(`${this._url}/realms/${this._realm}/protocol/openid-connect/${service}`, {
                method: 'POST',
                body: combinedParams.toString(),
                headers: headersTosend,
            });
        }
        
        return {
            token: async function(params: URLSearchParams){
                return post({ service:'token', params })
            },
            introspect: async function(params: URLSearchParams){
                return post({ service: 'token/introspect', params })
            },
            logout: async function(logoutDto: LogoutRequestDto){
                return post( { 
                    service: 'logout', 
                    headers: {
                        'Authorization': `Bearer ${logoutDto.accessToken}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },  
                    params: new URLSearchParams({
                        'refresh_token': logoutDto.refreshToken,
                        'post_logout_redirect_uri': logoutDto.redirectUrl
                    })
                })
            },
            userinfo: async function(accessToken: string) {
                return await fetch(`${self._url}/realms/${self._realm}/protocol/openid-connect/userinfo`, {
                    method: 'GET',
                    headers: { 
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                });
            }
        }   
    }    

}