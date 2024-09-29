import { UserInfoRequestDto } from "../domain/dtos";
import { UserInfo } from "../domain/entities";
import { UserRepository } from "../domain/repository";
import { GetUserInfoUseCase } from "../domain/use-cases";

export class GetUserInfo implements GetUserInfoUseCase{

    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(userInfoDto: UserInfoRequestDto): Promise<UserInfo> {
        const userInfo = await this.userRepository.info(userInfoDto)
        return userInfo
    }

}