import { Request, Response, Router } from 'express'
import { body, check } from 'express-validator'

import { keycloakRealm, keycloakUser, loginAuthFactory } from '../../../core/bootstrapper/repository'
import { validateFields } from '../../../core/server/express/middlewares'

import { validateAccessToken } from '../../../auth/presentation/middlewares'

import { UserController } from '../controller/user.controller'
import { UserService } from '../../services/user.service'

export class UserRouter {

    static get router(): Router {
        const router = Router()
        

        const userService = new UserService({realmRepository: keycloakRealm, userRepository: keycloakUser, loginAuthFactory})
        const controller = new UserController({userRepository: keycloakUser, userService})

        router.post('/user-info',[
            check('Authorization','El token de authorization es obligatorio').not().isEmpty(),
            check('Authorization','El token de authorization debe ser un string').isString(),
            check('Authorization','El token de authorization debe ser un string').matches(/^Bearer\s[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+$/),
            validateAccessToken(),
            validateFields,
        ],   ( req: Request, res: Response ) => controller.userInfo(req, res) )

        router.post('/register',[
            body('username')
                .isString().withMessage('El nombre de usuario debe ser un string.')
                .notEmpty().withMessage('El nombre de usuario es obligatorio.'),
            body('enabled')
                .isBoolean().withMessage('El campo enabled debe ser un booleano.')
                .notEmpty().withMessage('El campo enabled es obligatorio.'),
            body('email')
                .isEmail().withMessage('Debe proporcionar un email válido.')
                .notEmpty().withMessage('El email es obligatorio.'),
            body('first_name')
                .isString().withMessage('El primer nombre debe ser un string.')
                .notEmpty().withMessage('El primer nombre es obligatorio.'),
            body('last_name')
                .isString().withMessage('El apellido debe ser un string.')
                .notEmpty().withMessage('El apellido es obligatorio.'),
            body('credentials')
                .isArray({ min: 1 }).withMessage('Las credenciales son obligatorias y deben ser un array.')
                .notEmpty().withMessage('El array de credenciales no debe estar vacío.'),
            body('credentials.*.type')
                .isIn(['password', 'otp', 'webauthn', 'kerberos', 'x509']).withMessage('El tipo de credencial debe ser válido (password, otp, webauthn, kerberos, x509).'),
            body('credentials.*.value')
                .isString().withMessage('El valor de la credencial debe ser un string.')
                .notEmpty().withMessage('El valor de la credencial es obligatorio.'),
            body('credentials.*.temporary')
                .isBoolean().withMessage('El campo temporary debe ser un booleano.'),
            validateFields,
        ], ( req: Request, res: Response ) => controller.register(req, res) )

        return router
    }
    
}