import { Request, Response, NextFunction  } from 'express'
import { VerifyTokenRequestDto } from '../../domain/dtos'
import { AuthRepository } from '../../domain/repository'
import { VerifyToken } from '../../use-cases'
import { ServerResponse } from '../../../core/interfaces'
import { CustomError } from '../../../core/models'
import { keycloakAuth } from '../../../core/bootstrapper/repository'
import { InvalidTokenStatus } from '../../domain/entities'

declare global {
    namespace Express {
      interface Request {
        user?: { id: string; email: string };
      }
    }
  }

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
            const verifytokenResponse = await new VerifyToken(authRepository).execute(new VerifyTokenRequestDto({access_token}))
            if( verifytokenResponse instanceof InvalidTokenStatus ){
                res.status(400).json({
                    status: false,
                    response:'El token no es valido'
                } as ServerResponse<string>)
                return
            }
            req.user = {
                id: verifytokenResponse.sub,
                email: verifytokenResponse.email
            }
            next()

        } catch (error) {
            _handlerErrorVerifyToken(error, res)
        }
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