import { Response, Request } from 'express'

import { ServerResponse } from '../../../core/interfaces';

import { Controller } from './controller';
import { LoginRequestDto, LoginResponseDto } from '../../domain/dtos';
import { AuthRepository } from '../../domain/repository';
import { Login } from '../../use-cases/login.use-case';

export class AuthController extends Controller{

    constructor(
        private readonly authRepository: AuthRepository
    ){
        super()
    }

    login = (req: Request, res: Response) => {
        const authDto = new LoginRequestDto({...req.body})
        new Login(this.authRepository).execute(authDto)
        .then((response)=>{
            res.status(200).json({
                status:true,
                response
            } as ServerResponse<LoginResponseDto>)
        })
        .catch((error)=>{
            this.handleError(error, res)
        })
    }

    logout = (req: Request, res: Response) => {
        res.json('logout')
    }

    refresh = (req: Request, res: Response) => {
        res.json('refresh')
    }


}