import { SocialLoginUseCaseProps } from "../../domain/dtos";
import { SocialLoginUseCase } from "../../domain/use-cases";
import { ISocialAuthFactory } from "../../domain/repository";
import { FindUsers, GetClientCredentials } from "../../../realm/use-cases";
import { RealmRepository } from "../../../realm/domain/infrastructure";
import { LoginUser } from "../../domain/entities";
interface Props{
    socialAuthFactory: ISocialAuthFactory
    realmRepository: RealmRepository
}

export class SocialLogin implements SocialLoginUseCase {

    private readonly socialAuthFactory: ISocialAuthFactory
    private readonly realmRepository: RealmRepository
    constructor(props: Props){
        this.socialAuthFactory = props.socialAuthFactory
            this.realmRepository = props.realmRepository
    }

    async execute(socialLoginProps: SocialLoginUseCaseProps): Promise<any> {
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
        if(users.length > 0) {
            //Intentar cambiar el token

            //Si se puede FIN

            //Si no se puede, vicular el ipl al con el userId del proveedor y el mail

            //devolver el accessToken
        }

        //Cambiar el token

        return socialUser
    }

}