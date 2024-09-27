interface Props {
    username : string
    password : string
}

export class LoginRequestDto {

    public readonly username: string
    public readonly password: string

    constructor({username, password}: Props){
        this.username = username
        this.password = password
    }

}