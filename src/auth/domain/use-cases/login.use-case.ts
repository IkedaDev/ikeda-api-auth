import { LoginRequestDto, LoginResponseDto } from "../dtos";

export abstract class LoginUseCase{
    abstract execute( loginDto: LoginRequestDto ): Promise<LoginResponseDto>
}