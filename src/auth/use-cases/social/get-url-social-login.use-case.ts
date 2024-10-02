import { GetUrlSocialLoginUseCase } from "../../domain/use-cases";
import { GetUrlSocialLoginUseCaseDto } from "../../domain/dtos";
import { ISocialAuthFactory } from "../../domain/repository";


export class GetUrlSocialLogin implements GetUrlSocialLoginUseCase {

    constructor(
        private readonly socialAuthFactory: ISocialAuthFactory
    ){}

    execute(props: GetUrlSocialLoginUseCaseDto): Promise<string> {
        return this.socialAuthFactory.createProvider({ provider: props.provider }).getUrl({redirectUrl:props.redirect_url})
    }
}