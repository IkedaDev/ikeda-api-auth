import { SOCIAL_AUTH_PROVIDER } from "../../../enum"

interface Props{
    provider: SOCIAL_AUTH_PROVIDER
    redirect_url: string    
}


export class GetUrlSocialLoginRequestDto {
    public readonly provider: SOCIAL_AUTH_PROVIDER
    public readonly redirectUrl: string

    constructor({ provider,redirect_url }:Props){
        this.provider = provider
        this.redirectUrl = redirect_url
    }
}