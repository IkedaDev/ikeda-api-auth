import { LoginRequestDto, LoginResponseDto } from "../domain/dtos";
import { AuthRepository } from "../domain/repository/auth.repository";
import { LoginUseCase } from "../domain/use-cases/login.use-case";

export class Login implements LoginUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
        const auth = await this.authRepository.login(loginDto)
        return new LoginResponseDto(auth)
    }

}