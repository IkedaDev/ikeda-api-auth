import { UserInfoRequestDto } from "../dtos";
import { CreateUserProspRepository } from "../dtos/create-user/repository/create-user-props-repository.dto";
import { UserInfo } from "../entities";

export abstract class UserRepository {
    abstract info(loginRequestDto: UserInfoRequestDto): Promise<UserInfo>
    abstract createUser(createUser: CreateUserProspRepository): Promise<boolean>
}
