import { Router } from 'express'
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
        ],  controller.login )

        
        router.post('/logout',  controller.logout )
        router.post('/refresh',  controller.refresh )

        return router
    }
    
}