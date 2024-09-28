import { LoginRequestDto, LogoutRequestDto, RefreshRequestDto, RegisterRequestDto, UserInfoRequestDto, VerifyTokenRequestDto } from "../../domain/dtos";
import { LoginUser, InvalidTokenStatus, ValidTokenStatus, UserInfo } from "../../domain/entities";
import { AuthRepository } from "../../domain/repository";
import { CustomError } from '../../../core/models';
import { KeycloakConnectionProps } from "./interfaces";
import { KeycloakConnection } from "./connection/keycloak-connection.infrastructure";
import { KeycloakResponsesAdapter } from "./adapters";

export class KeycloakAuth extends KeycloakConnection implements AuthRepository {

    constructor(props: KeycloakConnectionProps){
        super(props);
    }

    async login(loginRequestDto: LoginRequestDto): Promise<LoginUser> {
        try {           
            const params = new URLSearchParams({
                'scope': 'openid',
                'grant_type': 'password',
                'username': loginRequestDto.username,
                'password': loginRequestDto.password,
            });

            const data = await this._token(params);
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

            const data = await this._token(params);
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
            const data = await this._introspect(params)
            if( !data.active ) return KeycloakResponsesAdapter.toInValidTokenStatus(data)
                
            return KeycloakResponsesAdapter.toValidTokenStatus(data)
        
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo verificar el token.')
        }
    }

    async userInfo( userInfoDto: UserInfoRequestDto ): Promise<UserInfo>{
        try {           
            const userInfo = await this._userInfo(userInfoDto.accessToken)
            return KeycloakResponsesAdapter.toUserInfo(userInfo)
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo obtener la informacion del usuario')
        }
    }

    async logout(logoutDto: LogoutRequestDto): Promise<boolean> {
        try {           
            return await this._logout(logoutDto)
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