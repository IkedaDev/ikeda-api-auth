

import { UserInfoRequestDto, UserInfoResponsetDto } from "../dtos";

export abstract class GetUserInfoUseCase{
    abstract execute( userInfoDto: UserInfoRequestDto ): Promise<UserInfoResponsetDto>
}