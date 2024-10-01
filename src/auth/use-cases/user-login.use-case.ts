import { UserLoginPropsUseCase } from "../domain/dtos";
import { LoginUser } from "../domain/entities";
import { AuthRepository } from "../domain/repository";
import { UserLoginUseCase } from "../domain/use-cases";

export class UserLogin implements UserLoginUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(loginDto: UserLoginPropsUseCase): Promise<LoginUser> {
        const auth = await this.authRepository.login(loginDto)
        return auth
    }

}