
interface Props {
    status: false
}

export class InvalidTokenStatus {
    public readonly status: boolean;

    constructor(props: Props){
        this.status = props.status;
    }

}