import { LoginRequestDto, LogoutRequestDto, RefreshRequestDto, RegisterRequestDto, UserInfoRequestDto, VerifyTokenRequestDto } from "../dtos";
import { LoginUser, InvalidTokenStatus, ValidTokenStatus, UserInfo } from "../entities";


export abstract class AuthRepository {
    abstract login(loginRequestDto: LoginRequestDto): Promise<LoginUser>
    abstract refreshToken( refreshDto: RefreshRequestDto ): Promise<LoginUser>
    abstract register( registerDto: RegisterRequestDto ): Promise<LoginUser>
    abstract verifyToken( verifyTokenDto: VerifyTokenRequestDto ): Promise<ValidTokenStatus | InvalidTokenStatus>
    abstract userInfo( userInfoDto: UserInfoRequestDto ): Promise<UserInfo>
    abstract logout( logoutDto: LogoutRequestDto ): Promise<boolean>
}
