import { LoginRequestDto, LoginResponseDto, RefreshRequestDto, RefreshResponseDto } from "../domain/dtos";
import { AuthRepository } from "../domain/repository";
import { RefreshTokenUseCase } from "../domain/use-cases";

export class RefreshToken implements RefreshTokenUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(refreshDto: RefreshRequestDto): Promise<RefreshResponseDto> {
        const resp = await this.authRepository.refreshToken(refreshDto)
        return new RefreshResponseDto(resp)
    }

}