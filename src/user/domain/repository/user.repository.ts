import { UserInfoRequestDto } from "../dtos";
import { UserInfo } from "../entities";

export abstract class UserRepository {
    abstract info(loginRequestDto: UserInfoRequestDto): Promise<UserInfo>
}
