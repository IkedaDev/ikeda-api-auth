import { UserInfoRequestDto, UserInfoResponsetDto } from "../domain/dtos";
import { AuthRepository } from "../domain/repository";
import { GetUserInfoUseCase } from "../domain/use-cases";

export class GetUserInfo implements GetUserInfoUseCase{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(userInfoDto: UserInfoRequestDto): Promise<UserInfoResponsetDto> {
        const userInfo = await this.authRepository.userInfo(userInfoDto)
        return new UserInfoResponsetDto(userInfo)
    }

}