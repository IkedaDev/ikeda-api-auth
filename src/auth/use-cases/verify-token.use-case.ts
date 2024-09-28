import { VerifyTokenRequestDto } from "../domain/dtos";
import { InvalidTokenStatus, ValidTokenStatus } from "../domain/entities";
import { AuthRepository } from "../domain/repository";
import { VerifyTokenUseCase } from "../domain/use-cases";

export class VerifyToken implements VerifyTokenUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(verifyDto: VerifyTokenRequestDto): Promise<ValidTokenStatus | InvalidTokenStatus> {
        const verifyResponse = await this.authRepository.verifyToken(verifyDto)
        return verifyResponse
    }

}