import { RealmRepository } from "src/realm/domain/infrastructure";
import { SocialLoginRequestDto } from "../domain/dtos";
import { AuthRepository, ILoginAuthFactory, ISocialAuthFactory } from "../domain/repository";
import { IAuthService } from "../domain/services";
import { SocialLogin } from "../use-cases";

interface Props{
    realmRepository: RealmRepository
    socialAuthFactory: ISocialAuthFactory
    loginAuthFactory: ILoginAuthFactory
    authRepository: AuthRepository
}

export class AuthService implements IAuthService {
    
    private readonly realmRepository: RealmRepository
    private readonly socialAuthFactory: ISocialAuthFactory
    private readonly loginAuthFactory: ILoginAuthFactory
    private readonly authRepository: AuthRepository

    constructor(props: Props){
        this.socialAuthFactory = props.socialAuthFactory
        this.realmRepository = props.realmRepository
        this.loginAuthFactory = props.loginAuthFactory
        this.authRepository = props.authRepository
    }


    async socialLogin(props: SocialLoginRequestDto): Promise<any> {
        const resp = await new SocialLogin({
            realmRepository: this.realmRepository,
            socialAuthFactory: this.socialAuthFactory,
            loginAuthFactory: this.loginAuthFactory,
            authRepository: this.authRepository,
        }).execute({
            code: props.code,
            provider: props.provider,
            redirectUrl: props.redirectUrl
        })
        return resp
    }

}