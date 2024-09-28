import { KeycloakFetch } from "../../../core/keycloak/keycloak-fetch";
import { CustomError } from '../../../core/models';

import { UserInfoRequestDto } from "../../domain/dtos";
import { UserInfo } from "../../domain/entities";
import { UserRepository } from "../../domain/repository";
import { KeycloakUserProps } from "./interfaces";
import { KeycloakResponsesAdapter } from "./adapters";

export class KeycloakUser implements UserRepository {

    private readonly _keycloackFetchBuilder : KeycloakFetch
    private readonly _realm: string 

    constructor(props: KeycloakUserProps){
        this._keycloackFetchBuilder = new KeycloakFetch({
            clientId: props.clientId, 
            clientSecret: props.clientSecret, 
            keycloakUrl: props.url,
        })
        this._realm = props.realm
    }

    async info( userInfoDto: UserInfoRequestDto ): Promise<UserInfo>{
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
            if(userInfo.error) throw CustomError.badRequest('No se pudo obtener la informacion del usuario')
            return KeycloakResponsesAdapter.toUserInfo(userInfo)
        } catch (error) {
            console.error(error);
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }

    
}