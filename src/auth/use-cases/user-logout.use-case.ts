import { LogoutRequestDto } from "../domain/dtos";
import { AuthRepository } from "../domain/repository";
import { UserLogoutUseCase } from "../domain/use-cases";

export class UserLogout implements UserLogoutUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(logoutDto: LogoutRequestDto): Promise<boolean> {
        const resp = await this.authRepository.logout(logoutDto)
        return resp
    }

}