import { Response, Request } from 'express'

import { Controller } from './controller';
import * as Dto from '../../domain/dtos';
import { UserRepository } from '../../domain/repository';
import * as UseCase from '../../use-cases';

export class UserController extends Controller{

    constructor(
        private readonly userRepository: UserRepository
    ){
        super()
    }

    userInfo(req: Request, res: Response){
        const access_token = req.headers['authorization'] as string 
        const userInfoDto = new Dto.UserInfoRequestDto({access_token: access_token.split(' ')[1]})
        new UseCase.GetUserInfo(this.userRepository).execute(userInfoDto)
        .then((response) => {
            res.status(200).json({
                status: true,
                response
            })
        })
        .catch( (error) => this.handleError(error, res) )
    }

}