


interface Props{
    id:string
    username: string
    lastname:string
    firstname:string
    email:string
    emailVerified:boolean
    img?:string
}

export class SocialUserLogin{
    public id: string 
    public username : string 
    public lastname : string 
    public firstname : string 
    public email : string 
    public emailVerified : boolean 
    public img ?: string 

    constructor(props: Props) {
        this.id = props.id
        this.username = props.username
        this.lastname = props.lastname
        this.firstname = props.firstname
        this.email = props.email
        this.emailVerified = props.emailVerified
        this.img = props.img
    }
}