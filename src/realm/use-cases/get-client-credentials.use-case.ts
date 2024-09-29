import { ClientCredentials } from "../domain/entity";
import { RealmRepository } from "../domain/infrastructure";
import { GetClientCredentialsUseCase } from "../domain/use-case";


export class GetClientCredentials implements GetClientCredentialsUseCase {

    constructor(
        private readonly realmRepository: RealmRepository
    ){}

    async execute(): Promise<ClientCredentials> {
        const credentials = await this.realmRepository.getClientCredentials()
        return credentials
    }

}