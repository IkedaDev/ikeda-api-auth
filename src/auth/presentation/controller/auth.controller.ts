import { Response, Request } from 'express'

import { Controller } from '../../../core/server/express/controller';
import * as Dto from '../../domain/dtos';
import { AuthRepository, ISocialAuthFactory } from '../../domain/repository';
import * as UseCase from '../../use-cases';
import { ServerResponse } from '../../../core/interfaces';
import { AuthControllerProps } from '../../domain/interfaces';
import { SOCIAL_AUTH_PROVIDER } from 'src/auth/domain/enum';



export class AuthController extends Controller{
    private readonly authRepository: AuthRepository
    private readonly socialAuthFactory: ISocialAuthFactory
    
    constructor({ authRepository, socialAuthFactory }: AuthControllerProps){
        super()
        this.authRepository = authRepository
        this.socialAuthFactory = socialAuthFactory
    }

    login(req: Request, res: Response){
        const loginDto = new Dto.LoginRequestDto({...req.body})
        new UseCase.UserLogin(this.authRepository).execute(loginDto)
        .then((response)=>{
            res.status(200).json({
                status:true,
                response: new Dto.LoginResponseDto(response)
            } as ServerResponse<Dto.LoginResponseDto> )
        })
        .catch( (error) => this.handleError(error, res) )
    }
    
    socialLogin(req: Request, res: Response){
        const requestDto = new Dto.GetUrlSocialLoginRequestDto({
            provider: req.query.provider as SOCIAL_AUTH_PROVIDER, 
            redirect_url: req.query.redirect_url as string
        })
        new UseCase.GetUrlSocialLogin(this.socialAuthFactory).execute({ provider: requestDto.provider, redirect_url: requestDto.redirectUrl })
        .then((response) => {
            res.status(200).json({
                status: true,
                response: new Dto.GetUrlSocialLoginResponseDto({url : response})
            } as ServerResponse<Dto.GetUrlSocialLoginResponseDto>)
        })
        .catch( (error) => this.handleError(error, res) )
    }

    refresh(req: Request, res: Response){
        const refreshDto = new Dto.RefreshRequestDto({...req.body})
        new UseCase.RefreshToken(this.authRepository).execute(refreshDto)
        .then((response) => {
            res.status(200).json({
                status: true,
                response: new Dto.RefreshResponseDto(response)
            } as ServerResponse<Dto.RefreshResponseDto>)
        })
        .catch( (error) => this.handleError(error, res) )
    }

    verify(req: Request, res: Response){
        const access_token = req.headers['authorization'] as string 
        const verifyDto = new Dto.VerifyTokenRequestDto({access_token: access_token.split(' ')[1]})
        new UseCase.VerifyToken(this.authRepository).execute(verifyDto)
        .then((response) => {
            res.status(200).json({
                status: true,
                response: new Dto.VerifyTokenResponseDto(response)
            } as ServerResponse<Dto.VerifyTokenResponseDto>)
        })
        .catch( (error) => this.handleError(error, res) )
    }

    logout(req: Request, res: Response){
        const access_token = req.headers['authorization'] as string 
        const logoutDto = new Dto.LogoutRequestDto({
            access_token: access_token.split(' ')[1], 
            refresh_token: req.body.refresh_token,
            redirect_url: req.body.redirect_url
        })
        new UseCase.UserLogout(this.authRepository).execute(logoutDto)
        .then((response) => {
            res.status(200).json({
                status: true,
                response:  new Dto.LogoutResponseDto({ 
                    ok: response,
                    message: response ? 'La sesion a sido cerrada' : 'No se ha podido cerrar la sesion'
                } )
            } as ServerResponse<Dto.LogoutResponseDto>)
        })
        .catch( (error) => this.handleError(error, res) )
    }

    


}