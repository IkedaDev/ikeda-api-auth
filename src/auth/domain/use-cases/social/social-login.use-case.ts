import { SocialLoginUseCaseProps } from "../../dtos";
import { LoginUser } from "../../entities";


export abstract class SocialLoginUseCase{
    abstract execute( socialLoginProps: SocialLoginUseCaseProps ) : Promise<LoginUser>
}