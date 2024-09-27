
interface Props{
    accessToken: string
    refreshToken: string
    expiresIn: number
    tokenType:string
}

export class LoginResponseDto {

    private readonly accessToken: string
    private readonly refreshToken: string
    private readonly expiresIn: number
    private readonly tokenType: string

    constructor({accessToken, refreshToken, expiresIn, tokenType}: Props){
        this.accessToken = accessToken        
        this.refreshToken = refreshToken
        this.expiresIn = expiresIn
        this.tokenType = tokenType        
    }

}