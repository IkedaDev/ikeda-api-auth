import { CustomError } from "../../core/models";
import { FindUsers, GetClientCredentials } from "../../realm/use-cases";
import { CreateUserRequestDto } from "../domain/dtos";
import { IUserService } from "../domain/services";
import { UserRepository } from "../domain/repository";
import { RealmRepository } from "../../realm/domain/infrastructure";
import { CreateUser } from "../use-cases";
import { UserLogin } from "../../auth/use-cases";
import { ILoginAuthFactory } from "../../auth/domain/repository";
import { LoginUser } from "../../auth/domain/entities";
import { LOGIN_TYPE } from "../../auth/domain/enum";
import { LoginRequestPasswordDto } from "../../auth/domain/dtos";

interface Props{
    realmRepository: RealmRepository
    userRepository: UserRepository
    loginAuthFactory: ILoginAuthFactory
}

export class UserService implements IUserService {

    private readonly userRepository: UserRepository
    private readonly realmRepository: RealmRepository
    private readonly loginAuthFactory: ILoginAuthFactory
    
    constructor({ realmRepository,userRepository, loginAuthFactory }:Props){
        this.userRepository = userRepository
        this.realmRepository = realmRepository
        this.loginAuthFactory = loginAuthFactory
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

       const loginUser = await new UserLogin(this.loginAuthFactory).execute( {
           grantType: LOGIN_TYPE.PASSWORD,
           data: new LoginRequestPasswordDto({
               password: credentialWithPassword.value,
               username: createUserDto.username,
           })
       } )
       
       return loginUser

    }

}