
interface Props {
    access_token: string
}

export class UserInfoRequestDto {

    public readonly accessToken: string

    constructor( { access_token }: Props ){
        this.accessToken = access_token
    }

}