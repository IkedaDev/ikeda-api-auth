
interface Props {
    username: string;
    enabled: boolean;
    email: string;
    first_name: string;
    last_name: string;
    credentials: Credential[];
}
  
interface Credential {
    type: 'password' | 'otp' | 'webauthn' | 'kerberos' | 'x509' | string;
    value: string;
    temporary?: boolean; 
  }

export class CreateUserRequestDto {

    public readonly username: string;
    public readonly enabled: boolean;
    public readonly email: string;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly credentials: Credential[];

    constructor(props: Props) {
        this.username = props.username;
        this.enabled = props.enabled;
        this.email = props.email;
        this.firstName = props.first_name;
        this.lastName = props.last_name;
        this.credentials = props.credentials;
    }

}