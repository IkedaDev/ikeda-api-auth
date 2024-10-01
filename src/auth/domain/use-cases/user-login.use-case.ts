import { UserLoginPropsUseCase } from "../dtos";
import { LoginUser } from "../entities";

export abstract class UserLoginUseCase{
    abstract execute( loginDto: UserLoginPropsUseCase ): Promise<LoginUser>
}