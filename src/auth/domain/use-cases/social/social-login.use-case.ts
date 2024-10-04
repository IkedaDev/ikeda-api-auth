import { SocialLoginUseCaseProps } from "../../dtos";


export abstract class SocialLoginUseCase{
    abstract execute( socialLoginProps: SocialLoginUseCaseProps ) : Promise<any>
}