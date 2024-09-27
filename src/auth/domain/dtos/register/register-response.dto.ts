

interface Props {
    username: string
    email: string
    password: string
}

export class RegisterResponseDto {

    public readonly username: string
    public readonly email: string
    public readonly password: string

    constructor( {username, email, password}: Props ){
        this.username = username
        this.email = email
        this.password = password
    }

}