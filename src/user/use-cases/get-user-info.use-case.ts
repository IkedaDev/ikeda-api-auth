import { UserInfoRequestDto, UserInfoResponsetDto } from "../domain/dtos";
import { UserRepository } from "../domain/repository";
import { GetUserInfoUseCase } from "../domain/use-cases";

export class GetUserInfo implements GetUserInfoUseCase{

    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(userInfoDto: UserInfoRequestDto): Promise<UserInfoResponsetDto> {
        const userInfo = await this.userRepository.info(userInfoDto)
        return new UserInfoResponsetDto(userInfo)
    }

}