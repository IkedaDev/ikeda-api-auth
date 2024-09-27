import 'dotenv/config'
import * as env from 'env-var'

export class Envs {
    static KEYCLOAK_URL: string = env.get('KEYCLOAK_URL').required().asUrlString()     
    static KEYCLOAK_REALM: string = env.get('KEYCLOAK_REALM').required().asString()
    static KEYCLOAK_CLIENTID: string = env.get('KEYCLOAK_CLIENTID').required().asString()
    static KEYCLOAK_CLIENTSECRET: string = env.get('KEYCLOAK_CLIENTSECRET').required().asString()
}