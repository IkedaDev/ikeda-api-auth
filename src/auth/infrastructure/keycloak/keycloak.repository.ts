import { KeycloakRepositoryBaseProps } from "../../../core/interfaces";
import { KeycloakFetch } from "../../../core/keycloak/keycloak-fetch";
import { CustomError } from '../../../core/models';

import { BindIdentityProviderRepositoryDto, LogoutRequestDto, RefreshRequestDto, VerifyTokenRequestDto } from "../../domain/dtos";
import { LoginUser, InvalidTokenStatus, ValidTokenStatus } from "../../domain/entities";
import { AuthRepository } from "../../domain/repository";
import { KeycloakResponsesAdapter } from "./adapters";

export class KeycloakAuth implements AuthRepository {

    private readonly _keycloackFetchBuilder : KeycloakFetch
    private readonly _realm: string 

    constructor(props: KeycloakRepositoryBaseProps){
        this._keycloackFetchBuilder = new KeycloakFetch({
            clientId: props.clientId, 
            clientSecret: props.clientSecret, 
            keycloakUrl: props.url,
        })
        this._realm = props.realm
    }

    async bindIdentityProvider(options: BindIdentityProviderRepositoryDto): Promise<boolean> {
        try {           
            const resp = await this._keycloackFetchBuilder
                    .setBody({
                        "userName": options.userProviderName,
                        "userId": options.userProviderId
                    })
                    .setHeaders({ 
                        'Authorization': `Bearer ${options.accessToken}`,
                        'Content-Type': 'application/json'
                    })
                    
                    .setMethod('POST')
                    .setPath(`/admin/realms/${this._realm}/users/${options.userKeycloakId}/federated-identity/${options.provider}`)
                    .fetch()
            return resp.ok;
        
        } catch (error) {
            console.error(error);
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }

    async refreshToken(refreshDto: RefreshRequestDto): Promise<LoginUser> {
        try {           
            const params = new URLSearchParams({
                'scope': 'openid',
                'grant_type': 'refresh_token',
                'refresh_token': refreshDto.refreshToken,
            });

            const resp = await this._keycloackFetchBuilder
                    .setParams(params)
                    .setMethod('POST')
                    .setPath(`/realms/${this._realm}/protocol/openid-connect/token`)
                    .fetch()
            const data = await resp.json()
            if(data.error) throw CustomError.badRequest('No se ha podido refrescar la sesion')
            return KeycloakResponsesAdapter.toLoginUser(data);
        
        } catch (error) {
            console.error(error);
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }

    async verifyToken(verifyTokenDto: VerifyTokenRequestDto): Promise<ValidTokenStatus | InvalidTokenStatus> {
        try {           
            const params = new URLSearchParams({
                'token': verifyTokenDto.accessToken,
            });

            const resp = await this._keycloackFetchBuilder
                    .setParams(params)
                    .setMethod('POST')
                    .setPath(`/realms/${this._realm}/protocol/openid-connect/token/introspect`)
                    .fetch()
            const data = await resp.json()
            if( !data.active ) return KeycloakResponsesAdapter.toInValidTokenStatus(data)
                
            return KeycloakResponsesAdapter.toValidTokenStatus(data)
        
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo verificar el token.')
        }
    }

    async logout(logoutDto: LogoutRequestDto): Promise<boolean> {
        try {           
            const resp = await this._keycloackFetchBuilder
            .setPath(`/realms/${this._realm}/protocol/openid-connect/logout`)
            .setMethod('POST')
            .setHeaders({
                'Authorization': `Bearer ${logoutDto.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            .setParams(new URLSearchParams({
                'refresh_token': logoutDto.refreshToken,
                'post_logout_redirect_uri': logoutDto.redirectUrl
            }))
            .fetch()

            return resp.ok
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo cerrar la session')
        }
    }
    
}