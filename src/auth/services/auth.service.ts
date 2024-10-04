import { RealmRepository } from "src/realm/domain/infrastructure";
import { SocialLoginRequestDto } from "../domain/dtos";
import { ISocialAuthFactory } from "../domain/repository";
import { IAuthService } from "../domain/services";
import { SocialLogin } from "../use-cases";

interface Props{
    realmRepository: RealmRepository
    // userRepository: UserRepository
    // authRespotitory: AuthRepository
    socialAuthFactory: ISocialAuthFactory
}

export class AuthService implements IAuthService {
    
    private readonly realmRepository: RealmRepository
    private readonly socialAuthFactory: ISocialAuthFactory

    constructor(props: Props){
        this.socialAuthFactory = props.socialAuthFactory
        this.realmRepository = props.realmRepository
    }


    async socialLogin(props: SocialLoginRequestDto): Promise<any> {
        const resp = await new SocialLogin({
            realmRepository: this.realmRepository,
            socialAuthFactory: this.socialAuthFactory,
        }).execute({
            code: props.code,
            provider: props.provider,
            redirectUrl: props.redirectUrl
        })
        return resp
    }

}