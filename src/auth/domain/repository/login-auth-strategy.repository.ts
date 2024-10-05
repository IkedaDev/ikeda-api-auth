import { createStrategyProps } from "../dtos";
import { LoginUser } from "../entities";

export abstract class ILoginAuthFactory{
    abstract createStrategy( props: createStrategyProps ): LoginAuthStrategy
} 

export abstract class LoginAuthStrategy {
    abstract login( data:Object ): Promise<LoginUser>
}