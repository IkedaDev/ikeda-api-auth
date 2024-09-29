import { CustomError } from "../../../core/models";
import { KeycloakFetch } from "../../../core/keycloak/keycloak-fetch";
import { KeycloakRepositoryBaseProps } from "../../../core/interfaces";

import { RealmRepository } from "../../domain/infrastructure";
import { KeycloakResponsesAdapter } from "./adapters";
import { ClientCredentials } from "../../domain/entity";

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