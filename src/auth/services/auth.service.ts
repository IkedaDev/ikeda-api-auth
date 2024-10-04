import { SocialLoginRequestDto } from "../domain/dtos";
import { ISocialAuthFactory } from "../domain/repository";
import { IAuthService } from "../domain/services";
import { SocialLogin } from "../use-cases";

interface Props{
    // realmRepository: RealmRepository
    // userRepository: UserRepository
    // authRespotitory: AuthRepository
    socialAuthFactory: ISocialAuthFactory
}

export class AuthService implements IAuthService {
    
    private readonly socialAuthFactory: ISocialAuthFactory

    constructor(props: Props){
        this.socialAuthFactory = props.socialAuthFactory
    }


    async socialLogin(props: SocialLoginRequestDto): Promise<any> {
        const resp = await new SocialLogin(this.socialAuthFactory).execute({
            code: props.code,
            provider: props.provider,
            redirectUrl: props.redirectUrl
        })
        return resp
    }

}