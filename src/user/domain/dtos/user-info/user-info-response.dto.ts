
interface Props {
    sub:                string;
    email:              Email
    name:               string;
    preferredUsername:  string;
    givenName:          string;
    familyName:         string;
}
interface Email {
    verified: boolean
    email: string
}

export class UserInfoResponsetDto {

    public readonly sub: string
    public readonly email_verified: boolean
    public readonly name: string
    public readonly preferred_username: string
    public readonly given_name: string
    public readonly family_name: string
    public readonly email: string

    constructor( { sub, email, name, preferredUsername, givenName, familyName }: Props ){
        this.sub = sub
        this.email_verified = email.verified
        this.email = email.email
        this.name = name
        this.preferred_username = preferredUsername
        this.given_name = givenName
        this.family_name = familyName
    }

}