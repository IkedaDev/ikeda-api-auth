import { LoginRequestDto } from "../dtos";
import { LoginUser } from "../entities";


export abstract class AuthRepository {
    abstract login(loginRequestDto: LoginRequestDto): Promise<LoginUser>
}
