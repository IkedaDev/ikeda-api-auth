import { PasswordLoginStrategyProps } from "../../../domain/interfaces";
import { LoginUser } from "../../../domain/entities";
import { LoginAuthStrategy } from "../../../domain/repository";
import { CustomError } from "../../../../core/models";
import { KeycloakResponsesAdapter } from "../adapters";
import { KeycloakFetch } from "../../../../core/keycloak/keycloak-fetch";

interface LoginProps{
    username: string
    password:string
}

export class PasswordAuthStrategy implements LoginAuthStrategy {

    private readonly _realm: string
    private readonly _keycloackFetchBuilder: KeycloakFetch

    constructor( {realm, keycloakFetch}: PasswordLoginStrategyProps ){
        this._realm  = realm
        this._keycloackFetchBuilder  = keycloakFetch
    }

    async login(loginProps: LoginProps): Promise<LoginUser> {
        try {           
            const params = new URLSearchParams({
                'scope': 'openid',
                'grant_type': 'password',
                'username': loginProps.username,
                'password': loginProps.password,
            });

            const resp = await this._keycloackFetchBuilder
                    .setParams(params)
                    .setMethod('POST')
                    .setPath(`/realms/${this._realm}/protocol/openid-connect/token`)
                    .fetch()
            const data = await resp.json()
            if(data.error) throw CustomError.badRequest('Usuario y/o contraseña invalidos')
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