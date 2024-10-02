import { GetUrlSocialLoginUseCaseDto } from "../../dtos/social/use-case/get-url-social-login-use-case.dto";


export abstract class GetUrlSocialLoginUseCase {
    abstract execute(props: GetUrlSocialLoginUseCaseDto): Promise<string>
}