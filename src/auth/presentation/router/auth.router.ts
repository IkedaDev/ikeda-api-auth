import { Request, Response, Router } from 'express'
import { check } from 'express-validator'
import { validateFields } from '../../../core/server/express/middlewares'
import { keycloakAuth } from '../../../core/bootstrapper/repository'
import { AuthController } from '../controller/auth.controller'
import { validateAccessToken } from '../middlewares'

export class AuthRouter {

    static get router(): Router {
        const router = Router()

        const controller = new AuthController( keycloakAuth )

        router.post('/login',[
            check('username','El username es obligatorio').not().isEmpty(),
            check('username','El username debe ser un string').isString(),
            check('password','El password es obligatorio').not().isEmpty(),
            check('password','La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
            validateFields,
        ],  ( req: Request, res: Response ) => controller.login(req, res) )

        router.post('/refresh',[
            check('refresh_token','El refresh_token es obligatorio').not().isEmpty(),
            check('refresh_token','El refresh_token debe ser un string').isString(),
            check('refresh_token','El refresh_token debe ser un JWT').isJWT(),
            validateFields,
        ],   ( req: Request, res: Response ) => controller.refresh(req, res) )
        
        router.post('/register',[
            check('username','El username es obligatorio').not().isEmpty(),
            check('username','El username debe ser un string').isString(),
            check('username','El username debe tener minimo 4 caracteres').isLength({min:4}),
            check('email','El email es obligatorio').not().isEmpty(),
            check('email','El email debe ser un email valido').isEmail(),
            check('password','El password es obligatorio').not().isEmpty(),
            check('password','La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
            validateFields,
        ],   ( req: Request, res: Response ) => controller.register(req, res) )

        router.post('/verify',[
            check('Authorization','El token de authorization es obligatorio').not().isEmpty(),
            check('Authorization','El token de authorization debe ser un string').isString(),
            check('Authorization','El token de authorization debe ser un string').matches(/^Bearer\s[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+$/),
            validateFields,
        ],   ( req: Request, res: Response ) => controller.verify(req, res) )

        router.post('/logout',[
            check('Authorization','El token de authorization es obligatorio').not().isEmpty(),
            check('Authorization','El token de authorization debe ser un string').isString(),
            check('Authorization','El token de authorization debe ser un string').matches(/^Bearer\s[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+$/),
            check('refresh_token','El refresh_token debe ser un string').isString(),
            check('refresh_token','El refresh_token debe ser un JWT').isJWT(),
            check('redirect_url','Se debe mandar una url de redireccion').not().isEmpty(),
            check('redirect_url','Se debe mandar una url valida').isURL(),
            validateAccessToken(),
            validateFields,
        ],  ( req: Request, res: Response ) => controller.logout(req, res) )

        return router
    }
    
}