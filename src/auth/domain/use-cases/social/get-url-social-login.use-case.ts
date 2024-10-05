import { GetUrlSocialLoginUseCaseDto } from "../../dtos/";

export abstract class GetUrlSocialLoginUseCase {
    abstract execute(props: GetUrlSocialLoginUseCaseDto): Promise<string>
}