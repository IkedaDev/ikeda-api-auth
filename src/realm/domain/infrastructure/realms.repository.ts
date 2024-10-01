import { ClientCredentials, User } from "../entity";
import { FindUsersPropsRepositoryDto } from '../dto'

export abstract class RealmRepository {
    abstract getClientCredentials(): Promise<ClientCredentials>
    abstract findUsers(findUserDto: FindUsersPropsRepositoryDto): Promise<User[]>
}