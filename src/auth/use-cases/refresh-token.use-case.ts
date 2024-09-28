import { RefreshRequestDto } from "../domain/dtos";
import { LoginUser } from "../domain/entities";
import { AuthRepository } from "../domain/repository";
import { RefreshTokenUseCase } from "../domain/use-cases";

export class RefreshToken implements RefreshTokenUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(refreshDto: RefreshRequestDto): Promise<LoginUser> {
        const resp = await this.authRepository.refreshToken(refreshDto)
        return resp
    }

}