import { BindIdentityProviderRepositoryDto, LogoutRequestDto, RefreshRequestDto, VerifyTokenRequestDto } from "../dtos";
import { LoginUser, InvalidTokenStatus, ValidTokenStatus } from "../entities";

export abstract class AuthRepository {
    abstract refreshToken( refreshDto: RefreshRequestDto ): Promise<LoginUser>
    abstract verifyToken( verifyTokenDto: VerifyTokenRequestDto ): Promise<ValidTokenStatus | InvalidTokenStatus>
    abstract logout( logoutDto: LogoutRequestDto ): Promise<boolean>
    abstract bindIdentityProvider(options: BindIdentityProviderRepositoryDto): Promise<boolean>
}
