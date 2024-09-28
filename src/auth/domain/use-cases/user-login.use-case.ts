import { LoginRequestDto } from "../dtos";
import { LoginUser } from "../entities";

export abstract class UserLoginUseCase{
    abstract execute( loginDto: LoginRequestDto ): Promise<LoginUser>
}