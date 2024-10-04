import { SOCIAL_AUTH_PROVIDER } from "src/auth/domain/enum"


export interface SocialLoginUseCaseProps{
    provider: SOCIAL_AUTH_PROVIDER
    redirectUrl:string
    code: string    
}