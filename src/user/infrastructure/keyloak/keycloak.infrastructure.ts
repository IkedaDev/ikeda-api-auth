import { KeycloakFetch } from "../../../core/keycloak/keycloak-fetch";
import { CustomError } from '../../../core/models';
import { KeycloakRepositoryBaseProps } from "../../../core/interfaces";

import { UserInfoRequestDto } from "../../domain/dtos";
import { UserInfo } from "../../domain/entities";
import { UserRepository } from "../../domain/repository";
import { KeycloakResponsesAdapter } from "./adapters";
import { CreateUserProspRepository } from "src/user/domain/dtos/create-user/repository/create-user-props-repository.dto";

export class KeycloakUser implements UserRepository {

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


    async createUser(createUser: CreateUserProspRepository): Promise<boolean> {
        try {           
            const resp = await this._keycloackFetchBuilder
                    .setPath(`/admin/realms/${this._realm}/users`)
                    .setMethod('POST')
                    .setHeaders({ 
                        'Authorization': `Bearer ${createUser.accessToken}`,
                        'Content-Type': 'application/json'
                    })
                    .setBody({
                        username: createUser.username,
                        enabled: createUser.enabled,
                        firstName: createUser.firstName,
                        lastName: createUser.lastName,
                        email: createUser.email,
                        credentials: createUser.credentials
                      })
                    .fetch()
                    
            if([201].includes(resp.status)){
                return true
            }
            throw CustomError.badRequest('No se pudo crear el usuario')
        } catch (error) {
            console.error(error);
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
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