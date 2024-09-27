interface Props {
    refresh_token: string
}

export class RefreshRequestDto {

    public readonly refreshToken: string

    constructor( {refresh_token}: Props ){
        this.refreshToken = refresh_token
    }

}