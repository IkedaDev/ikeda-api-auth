

interface Props{
    accessToken:string
    tokenType:string
    expireIn: number
    scope:string
}

export class SocialAccessToken{
    public accessToken : string 
    public tokenType : string 
    public expireIn : number 
    public scope : string 

    constructor(props: Props) {
        this.accessToken = props.accessToken
        this.tokenType = props.tokenType
        this.expireIn = props.expireIn
        this.scope = props.scope
    }
}