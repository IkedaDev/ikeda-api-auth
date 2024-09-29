import { Router } from 'express'
import { AuthRouter } from '../../../auth/presentation';
import { UserRouter } from '../../../user/presentation';
import { GetClientCredentials } from '../../../realm/use-cases';
import { keycloakRealm } from '../../bootstrapper/repository';

export class AppRouter {

    static get router(): Router {
        const router = Router()
        router.use('/api/auth', AuthRouter.router)
        router.use('/api/user', UserRouter.router)






        router.post('/test',(req,res) => {
            new GetClientCredentials(keycloakRealm).execute().then(resp => {
                res.json(resp)
            })
        })

        return router;
    }

}