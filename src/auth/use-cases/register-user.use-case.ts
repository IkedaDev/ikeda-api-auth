import { RegisterRequestDto, RegisterResponseDto } from "../domain/dtos";
import { AuthRepository } from "../domain/repository";
import { RegisterUserUseCase } from "../domain/use-cases";

export class RegisterUser implements RegisterUserUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(loginDto: RegisterRequestDto): Promise<RegisterResponseDto> {
        const auth = await this.authRepository.register(loginDto)
        return new RegisterResponseDto({email:'',password:'',username:''})
    }

}