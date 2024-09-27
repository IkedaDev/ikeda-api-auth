
interface Props {
    status: boolean
}

export class VerifyTokenResponseDto {

    public readonly status: boolean

    constructor( { status }: Props ){
        this.status = status
    }

}