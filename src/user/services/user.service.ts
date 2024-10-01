import { CustomError } from "../../core/models";
import { FindUsers, GetClientCredentials } from "../../realm/use-cases";
import { CreateUserRequestDto } from "../domain/dtos";
import { IUserService } from "../domain/services";
import { UserRepository } from "../domain/repository";
import { RealmRepository } from "../../realm/domain/infrastructure";
import { CreateUser } from "../use-cases";
import { UserLogin } from "../../auth/use-cases";
import { AuthRepository } from "../../auth/domain/repository";
import { LoginUser } from "../../auth/domain/entities";

interface Props{
    realmRepository: RealmRepository
    userRepository: UserRepository
    authRespotitory: AuthRepository
}

export class UserService implements IUserService {

    private readonly userRepository: UserRepository
    private readonly realmRepository: RealmRepository
    private readonly authRespotitory: AuthRepository
    
    constructor({ realmRepository,userRepository, authRespotitory }:Props){
        this.userRepository = userRepository
        this.realmRepository = realmRepository
        this.authRespotitory = authRespotitory
    }

    async register(createUserDto: CreateUserRequestDto): Promise<string | LoginUser> {
       const credentials = await new GetClientCredentials(this.realmRepository).execute()

        const users = await new FindUsers(this.realmRepository).execute({
            email: createUserDto.email,
            realmAccessToken: credentials.accessToken,
        })
        if(users.length > 0) throw CustomError.badRequest(`Este correo ya se encuentra registrado`)

       const resp = await new CreateUser(this.userRepository).execute({
        ...createUserDto,
        accessToken: credentials.accessToken
       })

       const credentialWithPassword = createUserDto.credentials.find( credential => credential.type == "password" );

       if( !credentialWithPassword ){
        if(resp)  return 'Usuario creado correctamente'
        throw CustomError.badRequest('No se ha podido crear al usuario') 
       }

       const loginUser = await new UserLogin(this.authRespotitory).execute( {
           password: credentialWithPassword.value,
           username: createUserDto.username,
       } )
       
       return loginUser

    }

}