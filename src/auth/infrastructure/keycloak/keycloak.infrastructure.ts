import { LoginRequestDto, RefreshRequestDto } from "../../domain/dtos";
import { LoginUser } from "../../domain/entities";
import { AuthRepository } from "../../domain/repository";
import { CustomError } from '../../../core/models';

interface Props {
    url: string
    clientId: string
    clientSecret: string
    realm: string
}

interface KeycloakResponse {
    expires_in: number;
    refresh_token: string;
    access_token: string;
    token_type: string;
}

export class KeycloakAuth implements AuthRepository {
    
    private readonly _url: string 
    private readonly _clientId: string 
    private readonly _clientSecret: string 
    private readonly _realm: string 

    constructor(props: Props){
        const { url, clientId, clientSecret, realm } = props
        this._url = url
        this._clientId = clientId
        this._clientSecret = clientSecret
        this._realm = realm

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

    private async fetchToken(params: URLSearchParams): Promise<KeycloakResponse> {
        const tokenUrl = `${this._url}/realms/${this._realm}/protocol/openid-connect/token`;

        const combinedParams = new URLSearchParams({
            'client_id': this._clientId,
            'client_secret': this._clientSecret,
        });
        params.forEach((value, key) => combinedParams.append(key, value) );

        const resp = await fetch(tokenUrl, {
            method: 'POST',
            body: combinedParams.toString(),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (!resp.ok) throw CustomError.badRequest('Error en la autenticación')

        return await resp.json() as KeycloakResponse;
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