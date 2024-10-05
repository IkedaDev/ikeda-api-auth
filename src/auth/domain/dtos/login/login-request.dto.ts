import { LOGIN_TYPE } from "../../enum"

interface Props {
    username : string
    password : string
    grant_type: LOGIN_TYPE
}

export class LoginRequestDto {

    public readonly username: string
    public readonly password: string
    public readonly grantType: LOGIN_TYPE

    constructor({username, password, grant_type}: Props){
        this.username = username
        this.password = password
        this.grantType = grant_type
    }

}