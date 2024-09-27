import { VerifyTokenRequestDto, VerifyTokenResponseDto } from "../domain/dtos";
import { AuthRepository } from "../domain/repository";
import { VerifyTokenUseCase } from "../domain/use-cases";

export class VerifyToken implements VerifyTokenUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(verifyDto: VerifyTokenRequestDto): Promise<VerifyTokenResponseDto> {
        const verifyResponse = await this.authRepository.verifyToken(verifyDto)
        return new VerifyTokenResponseDto({ status: verifyResponse.status })
    }

}