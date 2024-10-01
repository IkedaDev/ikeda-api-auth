
interface Props{
    accessToken: string
    expiresIn:number
    tokenType: string
    scope:string 
}

export class ClientCredentials {

    public readonly accessToken: string 
    public readonly expiresIn: number 
    public readonly tokenType: string 
    public readonly scope: string 

    constructor({accessToken, expiresIn, tokenType, scope}:Props){
        this.accessToken = accessToken
        this.expiresIn = expiresIn
        this.tokenType = tokenType
        this.scope = scope
    }

}