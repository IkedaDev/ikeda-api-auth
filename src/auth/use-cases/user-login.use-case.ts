import { LoginRequestDto, LoginResponseDto } from "../domain/dtos";
import { AuthRepository } from "../domain/repository";
import { UserLoginUseCase } from "../domain/use-cases";

export class UserLogin implements UserLoginUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
        const auth = await this.authRepository.login(loginDto)
        return new LoginResponseDto(auth)
    }

}