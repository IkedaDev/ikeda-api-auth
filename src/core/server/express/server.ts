import express from 'express'
import cors from 'cors'
import compression from 'compression';

interface Options {
    port: number
    router: express.Router
}

export class Server {

    public readonly app = express()
    private readonly port: number
    private readonly router: express.Router

    constructor( options : Options) {
        const { port, router} = options
        this.port = port
        this.router = router
    }

    public start(){
        this.setMiddlewares()
        this.setRoutes()
        this.startListen()
    }

    private setRoutes(): void {
        this.app.use( this.router )
    }

    private setMiddlewares(): void {
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true }) )
        this.app.use( compression() )
        this.app.use( cors() )
    }

    private startListen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
          });
    }
}