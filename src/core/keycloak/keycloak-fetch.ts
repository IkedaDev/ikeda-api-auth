

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

    private clear(){
        this._headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        this._method = 'POST'
        this._params = new URLSearchParams({
            'client_id': this._clientId,
            'client_secret': this._clientSecret,
        })
        return this
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
        let response
        if(this._method === 'GET'){
            response =  await fetch(`${this._keycloakUrl}${this._path}`, {
                method: this._method,
                headers: this._headers,
            });
        }else{
            response = await fetch(`${this._keycloakUrl}${this._path}`, {
                method: this._method,
                body: this._params.toString(),
                headers: this._headers,
            });
        }
        this.clear()

        return response
    }

}