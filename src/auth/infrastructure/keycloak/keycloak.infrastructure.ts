import { LoginRequestDto, RefreshRequestDto, RegisterRequestDto, VerifyTokenRequestDto } from "../../domain/dtos";
import { LoginUser, InvalidTokenStatus, ValidTokenStatus } from "../../domain/entities";
import { AuthRepository } from "../../domain/repository";
import { CustomError } from '../../../core/models';
import { KeycloakConnectionProps, KeycloakLoginResponse } from "./interfaces";
import { KeycloakConnection } from "./connection/keycloak-connection.infrastructure";
import { KeycloakResponsesAdapter } from "./adapters";

export class KeycloakAuth extends KeycloakConnection implements AuthRepository {

    constructor(props: KeycloakConnectionProps){
        super(props);
    }

    async login(loginRequestDto: LoginRequestDto): Promise<LoginUser> {
        try {           
            const params = new URLSearchParams({
                'grant_type': 'password',
                'username': loginRequestDto.username,
                'password': loginRequestDto.password,
            });

            const data = await this.token(params);
            return KeycloakResponsesAdapter.toLoginUser(data);
        
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo autenticar el usuario.')
        }
    }

    async refreshToken(refreshDto: RefreshRequestDto): Promise<LoginUser> {
        try {           
            const params = new URLSearchParams({
                'grant_type': 'refresh_token',
                'refresh_token': refreshDto.refreshToken,
            });

            const data = await this.token(params);
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
            const data = await this.introspect(params);

            if( !data.active ) return KeycloakResponsesAdapter.toInValidTokenStatus(data)
                
            return KeycloakResponsesAdapter.toValidTokenStatus(data)
        
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo verificar el token.')
        }
    }

    register(registerDto: RegisterRequestDto): Promise<LoginUser> {

        console.log(registerDto)

        throw new Error("Method not implemented.");
    }
    
}