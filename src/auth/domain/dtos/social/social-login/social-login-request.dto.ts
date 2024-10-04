import { SOCIAL_AUTH_PROVIDER } from "../../../enum"

interface Props{
    provider: SOCIAL_AUTH_PROVIDER
    code: string    
    redirect_url: string
}


export class SocialLoginRequestDto {
    public readonly provider: SOCIAL_AUTH_PROVIDER
    public readonly code: string
    public readonly redirectUrl: string

    constructor({ provider,code, redirect_url }:Props){
        this.provider = provider
        this.redirectUrl = redirect_url
        this.code = code
    }
}