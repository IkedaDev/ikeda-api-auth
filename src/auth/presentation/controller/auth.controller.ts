import { Response, Request } from 'express'

import { Controller } from './controller';
import * as Dto from '../../domain/dtos';
import { AuthRepository } from '../../domain/repository';
import * as UseCase from '../../use-cases';
import { ServerResponse } from '../../../core/interfaces';

export class AuthController extends Controller{

    constructor(
        private readonly authRepository: AuthRepository
    ){
        super()
    }

    login(req: Request, res: Response){
        const loginDto = new Dto.LoginRequestDto({...req.body})
        new UseCase.UserLogin(this.authRepository).execute(loginDto)
        .then((response)=>{
            res.status(200).json({
                status:true,
                response
            } as ServerResponse<Dto.LoginResponseDto> )
        })
        .catch( (error) => this.handleError(error, res) )
    }
    
    refresh = (req: Request, res: Response) => {
        const refreshDto = new Dto.RefreshRequestDto({...req.body})
        new UseCase.RefreshToken(this.authRepository).execute(refreshDto)
        .then((response) => {
            res.status(200).json({
                status: true,
                response
            })
        })
        .catch( (error) => this.handleError(error, res) )
    }

    logout = (req: Request, res: Response) => {
        res.json('logout')
    }

    


}