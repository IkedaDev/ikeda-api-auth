import { LoginRequestDto } from "../../domain/dtos";
import { LoginUser } from "../../domain/entities";
import { AuthRepository } from "../../domain/repository";
import { CustomError } from '../../../core/models';

interface Props {
    url: string
    clientId: string
    clientSecret: string
    realm: string
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
            const tokenUrl = `${this._url}/realms/${this._realm}/protocol/openid-connect/token`;
        
            const params = new URLSearchParams();
            params.append('client_id', this._clientId);
            params.append('client_secret', this._clientSecret);
            params.append('username', loginRequestDto.username);
            params.append('grant_type', 'password');
            params.append('password', loginRequestDto.password);
        
            const resp = await fetch(tokenUrl, {
                method: 'POST',
                body: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })

            if(!resp.ok) throw CustomError.badRequest('Error en la autenticación')

            const data = await resp.json()
            return new LoginUser({
                expiresIn: data.expires_in,
                refreshToken: data.refresh_token,
                accessToken: data.access_token,
                tokenType: data.token_type,
            })
        
        } catch (error) {
            console.error(error);
            throw CustomError.unauthorized('No se pudo autenticar el usuario.')
        }

    }

}