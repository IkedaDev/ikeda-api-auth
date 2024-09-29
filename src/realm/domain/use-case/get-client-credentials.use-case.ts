import { ClientCredentials } from "../entity";




export abstract class GetClientCredentialsUseCase {
    abstract execute(): Promise<ClientCredentials>
}