import { RefreshRequestDto, RefreshResponseDto } from "../dtos";

export abstract class RefreshTokenUseCase{
    abstract execute( refreshDto: RefreshRequestDto ): Promise<RefreshResponseDto>
}