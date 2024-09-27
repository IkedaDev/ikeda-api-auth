
interface Props {
    accessToken: string
    refreshToken: string
    expiresIn: number
    tokenType:string
}

export class RefreshResponseDto {

    private readonly access_token: string
    private readonly refresh_token: string
    private readonly expires_in: number
    private readonly token_type: string

    constructor({accessToken, refreshToken, expiresIn, tokenType}: Props){
        this.access_token = accessToken        
        this.refresh_token = refreshToken
        this.expires_in = expiresIn
        this.token_type = tokenType        
    }

}