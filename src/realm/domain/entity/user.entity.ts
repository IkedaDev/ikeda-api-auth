
export interface User {

    id: string
    username:string
    firstName:string
    lastname:string
    email:string
    emailVerified:boolean
    createdAt:number
    enabled:boolean
    totp:boolean

}