

import { UserInfoRequestDto } from "../dtos";
import { UserInfo } from "../entities";

export abstract class GetUserInfoUseCase{
    abstract execute( userInfoDto: UserInfoRequestDto ): Promise<UserInfo>
}