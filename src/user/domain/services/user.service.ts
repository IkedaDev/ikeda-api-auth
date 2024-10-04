import { LoginUser } from "../../../auth/domain/entities";
import { CreateUserRequestDto } from "../dtos";


export abstract class IUserService {
    abstract register(createUserDto: CreateUserRequestDto): Promise<string | LoginUser>
}