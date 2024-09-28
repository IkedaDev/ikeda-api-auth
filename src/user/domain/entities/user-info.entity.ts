interface Props{
    sub:                string;
    email:              Email
    name:               string;
    preferredUsername: string;
    givenName:         string;
    familyName:        string;
}

interface Email {
    verified: boolean
    email: string
}

export class UserInfo {
    public readonly sub: string
    public readonly email: Email
    public readonly name: string
    public readonly preferredUsername: string
    public readonly givenName: string
    public readonly familyName: string

    constructor({sub, email, name, preferredUsername, givenName, familyName }: Props){
        this.sub = sub        
        this.email = email
        this.name = name
        this.preferredUsername = preferredUsername
        this.givenName = givenName
        this.familyName = familyName
    }

}