

interface Props {
    clientId: string
    clientSecret: string
    keycloakUrl: string
}

export class KeycloakFetch {

    private _keycloakUrl: string = ''
    private _path: string = ''
    private _method: 'GET' | 'POST' = 'POST'
    private _clientId : string
    private _clientSecret : string
    private _params: URLSearchParams
    private _headers: HeadersInit = { 'Content-Type': 'application/x-www-form-urlencoded' }

    constructor({ clientId, clientSecret, keycloakUrl }:Props){
        this._clientId = clientId
        this._clientSecret = clientSecret
        this._keycloakUrl = keycloakUrl
        this._params = new URLSearchParams({
            'client_id': this._clientId,
            'client_secret': this._clientSecret,
        })
    }    

    setMethod(method: 'GET' | 'POST') {
        this._method = method
        return this
    }

    setPath(path:string): KeycloakFetch{
        this._path = path
        return this
    }

    setParams(params: URLSearchParams): KeycloakFetch{
        if(params && params.toString().length > 0){
            params.forEach((value, key) => this._params.append(key, value) );
        }
        return this
    }

    setHeaders(headers: HeadersInit): KeycloakFetch{
        this._headers = headers
        return this
    }

    async fetch(): Promise<Response>{
        if(this._method === 'GET'){
            return await fetch(`${this._keycloakUrl}${this._path}`, {
                method: this._method,
                headers: this._headers,
            });
        }
        
        return await fetch(`${this._keycloakUrl}${this._path}`, {
            method: this._method,
            body: this._params.toString(),
            headers: this._headers,
        });
    }

}