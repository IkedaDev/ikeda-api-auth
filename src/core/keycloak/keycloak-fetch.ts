

interface Props {
    clientId: string
    clientSecret: string
    keycloakUrl: string
}
type HttpMethods = 'GET' | 'POST' | 'PUT'
export class KeycloakFetch {

    private _keycloakUrl: string = ''
    private _path: string = ''
    private _method: HttpMethods = 'POST'
    private _clientId : string
    private _clientSecret : string
    private _params: URLSearchParams
    private _headers: HeadersInit = { 'Content-Type': 'application/x-www-form-urlencoded' }
    private _body: Object = {}
    private _haveBodyJson: boolean = false
    private _haveParams: boolean = false


    constructor({ clientId, clientSecret, keycloakUrl }:Props){
        this._clientId = clientId
        this._clientSecret = clientSecret
        this._keycloakUrl = keycloakUrl
        this._params = new URLSearchParams({
            'client_id': this._clientId,
            'client_secret': this._clientSecret,
        })
    }    

    setMethod(method: HttpMethods) {
        this._method = method
        return this
    }

    setBody(body:Object): KeycloakFetch{
        this._haveBodyJson = true;
        this._body = body
        return this
    }

    setPath(path:string): KeycloakFetch{
        this._haveBodyJson = false;
        this._path = path
        return this
    }

    setParams(params: URLSearchParams): KeycloakFetch{
        if(params && params.toString().length > 0){
            this._haveParams = true
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
            response =  await fetch(`${this._keycloakUrl}${this._path}?${this._haveParams && this._params.toString()}`, {
                method: this._method,
                headers: this._headers,
            });
        }else{
            response = await fetch(`${this._keycloakUrl}${this._path}`, {
                method: this._method,
                body: this._haveBodyJson ? JSON.stringify(this._body) : this._params.toString(),
                headers: this._headers,
            });
        }
        this.clear()

        return response
    }

    private clear(){
        this._haveParams = false
        this._haveBodyJson = false;
        this._headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        this._method = 'POST'
        this._params = new URLSearchParams({
            'client_id': this._clientId,
            'client_secret': this._clientSecret,
        })
        return this
    }

}