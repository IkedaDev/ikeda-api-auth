import { SocialLoginUseCaseProps } from "../../domain/dtos";
import { SocialLoginUseCase } from "../../domain/use-cases";
import { AuthRepository, ILoginAuthFactory, ISocialAuthFactory } from "../../domain/repository";
import { FindUsers, GetClientCredentials } from "../../../realm/use-cases";
import { RealmRepository } from "../../../realm/domain/infrastructure";
import { LoginUser } from "../../domain/entities";
import { LOGIN_TYPE } from "../../domain/enum";
import { BindIdentityProvider } from "../bind-identity-provider.use-case";

interface Props{
    socialAuthFactory: ISocialAuthFactory
    realmRepository: RealmRepository
    loginAuthFactory: ILoginAuthFactory
    authRepository: AuthRepository
}

export class SocialLogin implements SocialLoginUseCase {

    private readonly socialAuthFactory: ISocialAuthFactory
    private readonly realmRepository: RealmRepository
    private readonly loginAuthFactory: ILoginAuthFactory
    private readonly authRepository: AuthRepository

    constructor(props: Props){
        this.socialAuthFactory = props.socialAuthFactory
        this.realmRepository = props.realmRepository
        this.loginAuthFactory = props.loginAuthFactory
        this.authRepository = props.authRepository
    }

    async execute(socialLoginProps: SocialLoginUseCaseProps): Promise<LoginUser> {
        const provider = this.socialAuthFactory.createProvider({
            provider: socialLoginProps.provider
        })

        const socialAccessToken = await provider.getAccessToken({
            code: socialLoginProps.code,
            redirectUrl: socialLoginProps.redirectUrl
        })

        const socialUser = await provider.getUserProfile({
            accessToken: socialAccessToken.accessToken,
            tokenType: socialAccessToken.tokenType
        })

        const credentials = await new GetClientCredentials(this.realmRepository).execute()

        const users = await new FindUsers(this.realmRepository).execute({
            email: socialUser.email,
            realmAccessToken: credentials.accessToken,
        })

        const findUser = users.at(0)
        if( findUser ) {
            await new BindIdentityProvider(this.authRepository).execute({
                accessToken: credentials.accessToken,
                provider: socialLoginProps.provider,
                userKeycloakId: findUser.id,
                userProviderId: socialUser.id,
                userProviderName: socialUser.username
            })
        }
        
        const userLogin = await this.loginAuthFactory.createStrategy({
                loginType: LOGIN_TYPE.TOKEN_EXCHANGE,
        }).login({
            grantType: LOGIN_TYPE.TOKEN_EXCHANGE,
            provider: socialLoginProps.provider,
            token: socialAccessToken.accessToken
        })

        return userLogin

    }

}