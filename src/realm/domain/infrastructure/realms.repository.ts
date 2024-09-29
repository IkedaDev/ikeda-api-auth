import { ClientCredentials } from "../entity";



export abstract class RealmRepository {
    abstract getClientCredentials(): Promise<ClientCredentials>
}