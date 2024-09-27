interface Props{
    accessToken: string
    refreshToken: string
    expiresIn: number
    tokenType:string
}

export class LoginUser {
    public readonly accessToken: string
    public readonly refreshToken: string
    public readonly expiresIn: number
    public readonly tokenType: string

    constructor({accessToken ,refreshToken , expiresIn ,tokenType}: Props){
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.expiresIn = expiresIn
        this.tokenType = tokenType
    }

}