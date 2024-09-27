import { LoginRequestDto, RefreshRequestDto } from "../dtos";
import { LoginUser } from "../entities";


export abstract class AuthRepository {
    abstract login(loginRequestDto: LoginRequestDto): Promise<LoginUser>
    abstract refreshToken( refreshDto: RefreshRequestDto ): Promise<LoginUser>
}
