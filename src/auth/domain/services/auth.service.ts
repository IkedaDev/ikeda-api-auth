import { SocialLoginRequestDto } from "../dtos";

export abstract class IAuthService {
    abstract socialLogin(props: SocialLoginRequestDto): Promise<any>
}