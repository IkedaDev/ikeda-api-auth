import { LoginRequestDto, RefreshRequestDto } from "../../domain/dtos";
import { LoginUser } from "../../domain/entities";
import { AuthRepository } from "../../domain/repository";
import { CustomError } from '../../../core/models';
import { KeycloakConnectionProps, KeycloakResponse } from "./interfaces";
import { KeycloakConnection } from "./connection/keycloak-connection.infrastructure";

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

            const data = await this.fetchToken(params);
            return this.createLoginUser(data);
        
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

            const data = await this.fetchToken(params);
            return this.createLoginUser(data);
        
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo autenticar el usuario.')
        }
    }

    private createLoginUser(data: KeycloakResponse): LoginUser {
        return new LoginUser({
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            accessToken: data.access_token,
            tokenType: data.token_type,
        });
    }
    
}