import { RegisterRequestDto, RegisterResponseDto } from "../dtos";

export abstract class RegisterUserUseCase{
    abstract execute( registerDto: RegisterRequestDto ): Promise<RegisterResponseDto>
}