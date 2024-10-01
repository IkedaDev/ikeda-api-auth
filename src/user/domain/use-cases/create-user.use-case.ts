import { CreateUserProspUseCase } from "../dtos";


export abstract class CreateUserUseCase {
    
    abstract execute(createUser: CreateUserProspUseCase): Promise<boolean>

}