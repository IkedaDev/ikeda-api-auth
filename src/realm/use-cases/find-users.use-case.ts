import { FindUsersPropsUseCaseDto } from "../domain/dto";
import { User } from "../domain/entity";
import { RealmRepository } from "../domain/infrastructure";
import { FindUsersUseCase } from "../domain/use-case";


export class FindUsers implements FindUsersUseCase {

    constructor(
        private readonly realmRepository: RealmRepository
    ){}

    execute(findUsersDto: FindUsersPropsUseCaseDto): Promise<User[]> {
        return this.realmRepository.findUsers({...findUsersDto})
    }
}