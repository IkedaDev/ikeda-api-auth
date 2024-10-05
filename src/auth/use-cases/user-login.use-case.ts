import { UserLoginPropsUseCase } from "../domain/dtos";
import { LoginUser } from "../domain/entities";
import { ILoginAuthFactory } from "../domain/repository";
import { UserLoginUseCase } from "../domain/use-cases";

export class UserLogin implements UserLoginUseCase{

    constructor(
        private readonly loginAuthFactory: ILoginAuthFactory
    ){}

    async execute(loginDto: UserLoginPropsUseCase): Promise<LoginUser> {
        const auth = await this.loginAuthFactory.createStrategy({loginType: loginDto.grantType}).login(loginDto)
        return auth
    }

}