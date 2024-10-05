import { LOGIN_TYPE, SOCIAL_AUTH_PROVIDER } from "../../enum"

interface Props {
    data : LoginRequestPasswordDto | LoginRequestExchangeTokenDto
    grant_type: LOGIN_TYPE
}

export class LoginRequestDto {
    public readonly grantType: LOGIN_TYPE
    public readonly data: LoginRequestPasswordDto | LoginRequestExchangeTokenDto

    constructor({data, grant_type}: Props){
        this.grantType = grant_type
        this.data = data
    }

}

export class LoginRequestPasswordDto {
    public readonly username: string
    public readonly password: string
    constructor({username, password}: {username:string, password:string}){
        this.password = password
        this.username = username
    }
}

export class LoginRequestExchangeTokenDto {
    public readonly token: string
    public readonly provider: SOCIAL_AUTH_PROVIDER
    constructor({token, provider}: {token:string, provider: SOCIAL_AUTH_PROVIDER}){
        this.token = token
        this.provider = provider
    }
}