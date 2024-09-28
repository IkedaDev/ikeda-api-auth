import { Router } from 'express'
import { AuthRouter } from '../../../auth/presentation';
import { UserRouter } from '../../../user/presentation';

export class AppRouter {

    static get router(): Router {
        const router = Router()
        router.use('/api/auth', AuthRouter.router)
        router.use('/api/user', UserRouter.router)
        return router;
    }

}