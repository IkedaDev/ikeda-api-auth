import { CustomError } from "../../core/models";
import { UserLoginPropsUseCase, LoginAuthStrategyDto, LoginRequestPasswordDto, LoginRequestExchangeTokenDto } from "../domain/dtos";
import { LoginUser } from "../domain/entities";
import { LOGIN_TYPE } from "../domain/enum";
import { ILoginAuthFactory } from "../domain/repository";
import { UserLoginUseCase } from "../domain/use-cases";

export class UserLogin implements UserLoginUseCase{

    private createLoginDtoMap: Record<LOGIN_TYPE, (data: any) => LoginAuthStrategyDto>;

    constructor(
        private readonly loginAuthFactory: ILoginAuthFactory
    ){
        this.createLoginDtoMap = {
            [LOGIN_TYPE.PASSWORD]: this.createPasswordLoginDto,
            [LOGIN_TYPE.TOKEN_EXCHANGE]: this.createTokenExchangeLoginDto,
          };
    }

    async execute(loginDto: UserLoginPropsUseCase): Promise<LoginUser> {
        const createLoginDto = this.createLoginDtoMap[loginDto.grantType]?.(loginDto.data);
        if (!createLoginDto) throw CustomError.internalServer('Invalid login type or data')
        
        const auth = await this.loginAuthFactory.createStrategy({loginType: loginDto.grantType}).login(createLoginDto)
        return auth
    }

    private createPasswordLoginDto(data: LoginRequestPasswordDto): LoginAuthStrategyDto {
        return {
          grantType: LOGIN_TYPE.PASSWORD,
          password: data.password,
          username: data.username,
        };
    }

    private createTokenExchangeLoginDto(data: LoginRequestExchangeTokenDto): LoginAuthStrategyDto {
        return {
          grantType: LOGIN_TYPE.TOKEN_EXCHANGE,
          token: data.token,
          provider: data.provider
        };
    }

}