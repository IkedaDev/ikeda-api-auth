import { CreateUserProspUseCase } from "../domain/dtos";
import { UserRepository } from "../domain/repository";
import { CreateUserUseCase } from "../domain/use-cases";



export class CreateUser implements CreateUserUseCase {
    
    constructor(
        private readonly userRepository: UserRepository
    ){}
    
    execute(createUser: CreateUserProspUseCase): Promise<boolean> {
        const ok = this.userRepository.createUser(createUser)
        return ok
    }

}