import { LogoutRequestDto, LogoutResponseDto } from "../domain/dtos";
import { AuthRepository } from "../domain/repository";
import { UserLogoutUseCase } from "../domain/use-cases";

export class UserLogout implements UserLogoutUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(logoutDto: LogoutRequestDto): Promise<LogoutResponseDto> {
        const resp = await this.authRepository.logout(logoutDto)
        return new LogoutResponseDto({ 
            ok: resp,
            message: resp ? 'La sesion a sido cerrada' : 'No se ha podido cerrar la sesion'
        })
    }

}