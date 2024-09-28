import { VerifyTokenRequestDto } from "../dtos";
import { InvalidTokenStatus, ValidTokenStatus } from "../entities";

export abstract class VerifyTokenUseCase{
    abstract execute( verifyTokenDto: VerifyTokenRequestDto ): Promise<ValidTokenStatus | InvalidTokenStatus>
}