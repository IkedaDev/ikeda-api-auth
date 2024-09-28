interface Props {
    access_token: string
    redirect_url: string
    refresh_token: string
}

export class LogoutRequestDto {

    public readonly accessToken: string
    public readonly redirectUrl: string
    public readonly refreshToken: string

    constructor({access_token, refresh_token, redirect_url}: Props){
        this.accessToken = access_token
        this.refreshToken = refresh_token
        this.redirectUrl = redirect_url
    }

}