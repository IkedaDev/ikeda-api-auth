import { FindUsersPropsUseCaseDto } from "../dto";
import { User } from "../entity";


export abstract class FindUsersUseCase {
    abstract execute(findUsersDto: FindUsersPropsUseCaseDto): Promise<User[]>
}