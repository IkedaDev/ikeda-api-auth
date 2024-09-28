interface Props {
    ok: boolean
    message: string
}

export class LogoutResponseDto {

    public readonly ok: boolean
    public readonly message: string

    constructor({ok, message}: Props){
        this.ok = ok
        this.message = message
    }

}