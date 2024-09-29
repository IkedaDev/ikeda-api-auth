
interface Props{
    accessToken: string
    expiresIn:number
    tokenType: string
    scope:string 
}

export class ClientCredentials {

    private readonly accessToken: string 
    private readonly expiresIn: number 
    private readonly tokenType: string 
    private readonly scope: string 

    constructor({accessToken, expiresIn, tokenType, scope}:Props){
        this.accessToken = accessToken
        this.expiresIn = expiresIn
        this.tokenType = tokenType
        this.scope = scope
    }

}