import { Response, Request } from 'express'

import { Controller } from '../../../core/server/express/controller';
import * as Dto from '../../domain/dtos';
import { UserRepository } from '../../domain/repository';
import * as UseCase from '../../use-cases';
import { ServerResponse } from '../../../core/interfaces';
import { IUserService } from '../../domain/services';

interface Props{
    userRepository: UserRepository,
    userService: IUserService,
}

export class UserController extends Controller{

    private readonly userRepository: UserRepository
    private readonly userService: IUserService

    constructor({userRepository,userService}:Props ){
        super()
        this.userRepository = userRepository
        this.userService = userService
    }

    userInfo(req: Request, res: Response){
        const access_token = req.headers['authorization'] as string 
        const userInfoDto = new Dto.UserInfoRequestDto({access_token: access_token.split(' ')[1]})
        new UseCase.GetUserInfo(this.userRepository).execute(userInfoDto)
        .then((response) => {
            res.status(200).json({
                status: true,
                response: new Dto.UserInfoResponsetDto(response)
            } as ServerResponse<Dto.UserInfoResponsetDto>)
        })
        .catch( (error) => this.handleError(error, res) )
    }

    register(req: Request, res: Response){
        const createUserDto = new Dto.CreateUserRequestDto({...req.body})
        this.userService.register(createUserDto)
            .then((response) => {
                res.status(200).json({
                    status: true,
                    response: response
                } as ServerResponse<string>)
            })
            .catch( (error) => this.handleError(error, res) )
    }



}