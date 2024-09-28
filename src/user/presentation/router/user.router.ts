import { Request, Response, Router } from 'express'
import { check } from 'express-validator'
import { UserController } from '../controller/user.controller'
import { validateFields } from '../../../core/server/express/middlewares'
import { validateAccessToken } from '../../../auth/presentation/middlewares'
import { keycloakUser } from '../../../core/bootstrapper/repository'

export class UserRouter {

    static get router(): Router {
        const router = Router()

        const controller = new UserController(keycloakUser)

        router.post('/user-info',[
            check('Authorization','El token de authorization es obligatorio').not().isEmpty(),
            check('Authorization','El token de authorization debe ser un string').isString(),
            check('Authorization','El token de authorization debe ser un string').matches(/^Bearer\s[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+$/),
            validateAccessToken(),
            validateFields,
        ],   ( req: Request, res: Response ) => controller.userInfo(req, res) )


        return router
    }
    
}