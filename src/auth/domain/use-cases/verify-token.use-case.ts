import { VerifyTokenRequestDto, VerifyTokenResponseDto } from "../dtos";

export abstract class VerifyTokenUseCase{
    abstract execute( verifyTokenDto: VerifyTokenRequestDto ): Promise<VerifyTokenResponseDto>
}