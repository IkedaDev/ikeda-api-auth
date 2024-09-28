import { KeycloakFetch } from "../../../core/keycloak/keycloak-fetch";
import { CustomError } from '../../../core/models';

import { LoginRequestDto, LogoutRequestDto, RefreshRequestDto, RegisterRequestDto, UserInfoRequestDto, VerifyTokenRequestDto } from "../../domain/dtos";
import { LoginUser, InvalidTokenStatus, ValidTokenStatus, UserInfo } from "../../domain/entities";
import { AuthRepository } from "../../domain/repository";
import { KeycloakConnectionProps } from "./interfaces";
import { KeycloakResponsesAdapter } from "./adapters";

export class KeycloakAuth implements AuthRepository {

    private readonly _keycloackFetchBuilder : KeycloakFetch
    private readonly _realm: string 

    constructor(props: KeycloakConnectionProps){
        this._keycloackFetchBuilder = new KeycloakFetch({
            clientId: props.clientId, 
            clientSecret: props.clientSecret, 
            keycloakUrl: props.url,
        })
        this._realm = props.realm
    }

    async login(loginRequestDto: LoginRequestDto): Promise<LoginUser> {
        try {           
            const params = new URLSearchParams({
                'scope': 'openid',
                'grant_type': 'password',
                'username': loginRequestDto.username,
                'password': loginRequestDto.password,
            });

            const resp = await this._keycloackFetchBuilder
                    .setParams(params)
                    .setMethod('POST')
                    .setPath(`/realms/${this._realm}/protocol/openid-connect/token`)
                    .fetch()
            const data = await resp.json()
            return KeycloakResponsesAdapter.toLoginUser(data);
        
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo autenticar el usuario.')
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
            return KeycloakResponsesAdapter.toLoginUser(data);
        
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo autenticar el usuario.')
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

    async userInfo( userInfoDto: UserInfoRequestDto ): Promise<UserInfo>{
        try {           
            const resp = await this._keycloackFetchBuilder
                    .setPath(`/realms/${this._realm}/protocol/openid-connect/userinfo`)
                    .setMethod('GET')
                    .setHeaders({ 
                        'Authorization': `Bearer ${userInfoDto.accessToken}`,
                        'Content-Type': 'application/json'
                    })
                    .fetch()
            const userInfo = await resp.json()
            return KeycloakResponsesAdapter.toUserInfo(userInfo)
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo obtener la informacion del usuario')
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

    register(registerDto: RegisterRequestDto): Promise<LoginUser> {

        console.log(registerDto)

        throw new Error("Method not implemented.");
    }
    
}