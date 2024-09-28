import { Request, Response, NextFunction  } from 'express'
import { VerifyTokenRequestDto } from '../../domain/dtos'
import { AuthRepository } from '../../domain/repository'
import { VerifyToken } from '../../use-cases'
import { ServerResponse } from '../../../core/interfaces'
import { CustomError } from '../../../core/models'
import { keycloakAuth } from '../../../core/bootstrapper/repository'

export const validateAccessToken = ( authRepository: AuthRepository = keycloakAuth ) => {

    return async( req: Request, res: Response, next: NextFunction ): Promise<void> => {
        const access_token = (req.headers['authorization'] as string).split(' ')[1]
        if( !access_token ) {
            res.status(400).json({
                status: false,
                response:'No hay token en la peticion'
            } as ServerResponse<string>)
            return
        }
        
        try {
            const { status } = await new VerifyToken(authRepository).execute(new VerifyTokenRequestDto({access_token}))
            if( !status ){
                res.status(400).json({
                    status: false,
                    response:'El token no es valido'
                } as ServerResponse<string>)
                return
            }
        } catch (error) {
            _handlerErrorVerifyToken(error, res)
        }

        next()
    }
}

const _handlerErrorVerifyToken = (error: unknown, res: Response) => {
    if(error instanceof CustomError){
        res.status(error.statusCode).json({
            status: false,
            response:error.message
        } as ServerResponse<string>)
        return
    }
    console.error(error)
    res.status(500).json({
        status: false,
        response:'Internal Server Error'
    } as ServerResponse<string>)
    return
} 