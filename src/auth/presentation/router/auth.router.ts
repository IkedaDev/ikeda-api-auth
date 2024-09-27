import { Request, Response, Router } from 'express'
import { AuthController } from '../controller/auth.controller'
import { check } from 'express-validator'
import { validateFields } from '../../../core/server/express/middlewares'
import { KeycloakAuth } from '../../infrastructure'

export class AuthRouter {

    static get router(): Router {
        const router = Router()

        const keycloak = new KeycloakAuth({
            url: 'http://localhost:8080',
            realm:'ikedadev',
            clientId: 'ikeda-api-auth',
            clientSecret: 'kvMisqbAO3hAtShhcHgcWfyT0REICsfB'
        })

        const controller = new AuthController(keycloak)

        router.post('/login',[
            check('username','El username es obligatorio').not().isEmpty(),
            check('username','El username debe ser un string').isString(),
            check('password','El password es obligatorio').not().isEmpty(),
            check('password','La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
            validateFields
        ],  ( req:Request, res:Response ) => controller.login(req, res) )

        router.post('/refresh',[
            check('refresh_token','El refresh_token es obligatorio').not().isEmpty(),
            check('refresh_token','El refresh_token debe ser un string').isString(),
            check('refresh_token','El refresh_token debe ser un JWT').isJWT(),
            validateFields
        ],   ( req:Request, res:Response ) => controller.refresh(req, res) )
        
        router.post('/logout',  controller.logout )

        return router
    }
    
}