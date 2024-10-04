import { SocialLoginUseCaseProps } from "../../domain/dtos";
import { SocialLoginUseCase } from "../../domain/use-cases";
import { ISocialAuthFactory } from "../../domain/repository";


export class SocialLogin implements SocialLoginUseCase {

    constructor(
        private readonly socialAuthFactory: ISocialAuthFactory
    ){}

    async execute(socialLoginProps: SocialLoginUseCaseProps): Promise<any> {
        const provider = this.socialAuthFactory.createProvider({
            provider: socialLoginProps.provider
        })

        const socialAccessToken = await provider.getAccessToken({
            code: socialLoginProps.code,
            redirectUrl: socialLoginProps.redirectUrl
        })
        return socialAccessToken
    }

}