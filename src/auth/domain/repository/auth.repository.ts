import { LoginRequestDto, RefreshRequestDto, RegisterRequestDto, VerifyTokenRequestDto } from "../dtos";
import { LoginUser, InvalidTokenStatus, ValidTokenStatus } from "../entities";


export abstract class AuthRepository {
    abstract login(loginRequestDto: LoginRequestDto): Promise<LoginUser>
    abstract refreshToken( refreshDto: RefreshRequestDto ): Promise<LoginUser>
    abstract register( registerDto: RegisterRequestDto ): Promise<LoginUser>
    abstract verifyToken( verifyTokenDto: VerifyTokenRequestDto ): Promise<ValidTokenStatus | InvalidTokenStatus>
}
