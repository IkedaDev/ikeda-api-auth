import { LoginUser } from "../../../domain/entities";
import { TokenExchangeLoginStrategyProps } from "../../../domain/interfaces";
import { LoginAuthStrategy } from "../../../domain/repository";
import { KeycloakFetch } from "../../../../core/keycloak/keycloak-fetch";
import { CustomError } from "../../../../core/models";
import { KeycloakResponsesAdapter } from "../adapters";
import { LoginAuthStrategyDto } from "../../../domain/dtos/login/repository/login-auth-strategy.dto";
import { LOGIN_TYPE } from "../../../domain/enum";


export class TokenExchangeLoginStrategy implements LoginAuthStrategy {
    
    private readonly _realm: string
    private readonly _keycloackFetchBuilder: KeycloakFetch

    constructor( {realm, keycloakFetch}: TokenExchangeLoginStrategyProps ){
        this._realm  = realm
        this._keycloackFetchBuilder  = keycloakFetch
    }

    async login(loginProps: LoginAuthStrategyDto): Promise<LoginUser> {
        if(loginProps.grantType != LOGIN_TYPE.TOKEN_EXCHANGE ) throw CustomError.internalServer() 
        try {           
            const params = new URLSearchParams({
                // 'scope': 'openid',
                'grant_type': 'urn:ietf:params:oauth:grant-type:token-exchange',
                'subject_issuer': loginProps.provider,
                'subject_token': loginProps.token,
            });

            const resp = await this._keycloackFetchBuilder
                    .setParams(params)
                    .setMethod('POST')
                    .setPath(`/realms/${this._realm}/protocol/openid-connect/token`)
                    .fetch()
            const data = await resp.json()
            if(data.error) throw CustomError.badRequest('El token no es valido')
            return KeycloakResponsesAdapter.toLoginUser(data);
        
        } catch (error) {
            console.error(error);
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }

}