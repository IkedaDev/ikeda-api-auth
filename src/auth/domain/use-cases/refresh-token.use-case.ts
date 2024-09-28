import { RefreshRequestDto } from "../dtos";
import { LoginUser } from "../entities";

export abstract class RefreshTokenUseCase{
    abstract execute( refreshDto: RefreshRequestDto ): Promise<LoginUser>
}