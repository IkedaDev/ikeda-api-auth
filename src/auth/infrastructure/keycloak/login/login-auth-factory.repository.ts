import { ILoginAuthFactory, LoginAuthStrategy } from "../../../domain/repository";
import { LOGIN_TYPE } from "../../../domain/enum";
import { PasswordAuthStrategy } from "./password-auth-strategy.repository";
import { Envs } from "../../../../core/utils";
import { createStrategyProps } from "../../../domain/dtos";
import { CustomError } from "../../../../core/models";
import { KeycloakFetch } from "../../../../core/keycloak/keycloak-fetch";
import { TokenExchangeLoginStrategy } from "./token-exchange-login-strategy.repository";



export class LoginAuthFactory implements ILoginAuthFactory {

    private readonly strategies: Record<LOGIN_TYPE, LoginAuthStrategy>;
    
    private readonly propsToStrategies = {
        keycloakFetch: new KeycloakFetch({
            clientId: Envs.KEYCLOAK_CLIENTID, 
            clientSecret: Envs.KEYCLOAK_CLIENTSECRET, 
            keycloakUrl: Envs.KEYCLOAK_URL,
        }),
        realm: Envs.KEYCLOAK_REALM
    }
    
    constructor(){
        this.strategies = {
            [LOGIN_TYPE.PASSWORD]: new PasswordAuthStrategy(this.propsToStrategies),
            [LOGIN_TYPE.TOKEN_EXCHANGE]: new TokenExchangeLoginStrategy(this.propsToStrategies)
        }
    }

    createStrategy( props: createStrategyProps ){
        const provider = this.strategies[props.loginType]
        if( !provider ) throw CustomError.internalServer()
        return provider
    }
}