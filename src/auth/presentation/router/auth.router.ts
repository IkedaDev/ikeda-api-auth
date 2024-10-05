import { Request, Response, Router } from 'express'
import { check, checkSchema } from 'express-validator'
import { validateFields } from '../../../core/server/express/middlewares'
import { keycloakAuth, keycloakRealm, socialAuthFactory, loginAuthFactory } from '../../../core/bootstrapper/repository'
import { AuthController } from '../controller/auth.controller'
import { validateAccessToken } from '../middlewares'
import { LOGIN_TYPE, SOCIAL_AUTH_PROVIDER } from '../../domain/enum'
import { AuthService } from '../../services'
import { loginValidationSchema } from './validations.router'

export class AuthRouter {

    static get router(): Router {
        const router = Router()

        const authService = new AuthService({socialAuthFactory,realmRepository: keycloakRealm, loginAuthFactory, authRepository: keycloakAuth})
        const controller = new AuthController( { 
            authRepository: keycloakAuth,
            socialAuthFactory: socialAuthFactory,
            authService,
            loginAuthFactory,
            } )

        router.post('/login',[
            ...checkSchema(loginValidationSchema),

            validateFields,
        ], ( req: Request, res: Response ) => controller.login(req, res) )

        
        router.get('/login/social',[
            check('redirect_url','Se debe mandar una url de redireccion').not().isEmpty(),
            check('redirect_url','Se debe mandar una url valida').isURL(),
            check('provider')
            .custom((value) => {
                if (!Object.values(SOCIAL_AUTH_PROVIDER).includes(value)) {
                    throw new Error(`Proveedor de autenticación no válido - ${Object.values(SOCIAL_AUTH_PROVIDER)}` );
                }
                return true;
            }),
            validateFields,
        ], ( req: Request, res: Response ) => controller.getUrlSocialLogin(req, res) )
        
        router.post('/login/social',[
            check('code','Se debe mandar el codigó').not().isEmpty(),
            check('code','El codigó debe ser un string').isString(),
            check('redirect_url','Se debe mandar una url de redireccion').not().isEmpty(),
            check('redirect_url','Se debe mandar una url valida').isURL(),
            check('provider')
            .custom((value) => {
                if (!Object.values(SOCIAL_AUTH_PROVIDER).includes(value)) {
                    throw new Error(`Proveedor de autenticación no válido - ${Object.values(SOCIAL_AUTH_PROVIDER)}` );
                }
                return true;
            }),
            validateFields,
        ], ( req: Request, res: Response ) => controller.socialLogin(req, res) )


        router.post('/refresh',[
            check('refresh_token','El refresh_token es obligatorio').not().isEmpty(),
            check('refresh_token','El refresh_token debe ser un string').isString(),
            check('refresh_token','El refresh_token debe ser un JWT').isJWT(),
            validateFields,
        ], ( req: Request, res: Response ) => controller.refresh(req, res) )

        router.post('/verify',[
            check('Authorization','El token de authorization es obligatorio').not().isEmpty(),
            check('Authorization','El token de authorization debe ser un string').isString(),
            check('Authorization','El token de authorization debe ser un string').matches(/^Bearer\s[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+\.[0-9a-zA-Z\-_]+$/),
            validateFields,
        ], ( req: Request, res: Response ) => controller.verify(req, res) )

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
        ], ( req: Request, res: Response ) => controller.logout(req, res) )

        return router
    }
    
}