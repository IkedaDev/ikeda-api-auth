import { CustomError } from "../../../core/models";
import { KeycloakFetch } from "../../../core/keycloak/keycloak-fetch";
import { KeycloakRepositoryBaseProps } from "../../../core/interfaces";

import { RealmRepository } from "../../domain/infrastructure";
import { KeycloakResponsesAdapter } from "./adapters"; 
import { ClientCredentials, User } from "../../domain/entity";
import { FindUsersPropsRepositoryDto } from "../../domain/dto";

export class KeycloakRealm implements RealmRepository {

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


    async findUsers(findUserDto: FindUsersPropsRepositoryDto): Promise<User[]> {
        try {           
            const params = new URLSearchParams()
            if(findUserDto.email) params.append('email',findUserDto.email)
            if(findUserDto.username) params.append('username',findUserDto.username)
            const resp = await this._keycloackFetchBuilder
                    .setPath(`/admin/realms/${this._realm}/users`)
                    .setMethod('GET')
                    .setHeaders({ 
                        'Authorization': `Bearer ${findUserDto.realmAccessToken}`,
                        'Content-Type': 'application/json'
                    })
                    .setParams(params)
                    .fetch()
            const users = await resp.json()
            if(!resp.ok) throw CustomError.badRequest('No se pudo buscar al usuario')
            return KeycloakResponsesAdapter.toUsers(users)
        } catch (error) {
            console.error(error);
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }

    async getClientCredentials(): Promise<ClientCredentials> {
        try {           
            const resp = await this._keycloackFetchBuilder
                    .setPath(`/realms/${this._realm}/protocol/openid-connect/token`)
                    .setMethod('POST')
                    .setParams(new URLSearchParams({
                        grant_type:'client_credentials'
                    }))
                    .fetch()
            const credentials = await resp.json()
            if(credentials.error) throw CustomError.badRequest('No se pudo obtener la informacion del usuario')
            return KeycloakResponsesAdapter.toGetClientCredentials(credentials)
        } catch (error) {
            console.error(error);
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalServer()
        }
    }
}