import { LoginRequestDto, LoginResponseDto } from "../dtos";

export abstract class UserLoginUseCase{
    abstract execute( loginDto: LoginRequestDto ): Promise<LoginResponseDto>
}