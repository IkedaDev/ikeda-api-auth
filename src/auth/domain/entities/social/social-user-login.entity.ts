


interface Props{
    username: string
    lastname:string
    firstname:string
    email:string
    emailVerified:boolean
    img?:string
}

export class SocialUserLogin{
    public username : string 
    public lastname : string 
    public firstname : string 
    public email : string 
    public emailVerified : boolean 
    public img ?: string 

    constructor(props: Props) {
        this.username = props.username
        this.lastname = props.lastname
        this.firstname = props.firstname
        this.email = props.email
        this.emailVerified = props.emailVerified
        this.img = props.img
    }
}