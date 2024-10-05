import { createStrategyProps } from "../dtos";
import { LoginAuthStrategyDto } from "../dtos/login/repository/login-auth-strategy.dto";
import { LoginUser } from "../entities";

export abstract class ILoginAuthFactory{
    abstract createStrategy( props: createStrategyProps ): LoginAuthStrategy
} 

export abstract class LoginAuthStrategy {
    abstract login( data:LoginAuthStrategyDto ): Promise<LoginUser>
}