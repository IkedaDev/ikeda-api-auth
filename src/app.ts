import * as express from "./core/server/express"

function main(){
    const server = new express.Server({
        port: 3000,
        router: express.AppRouter.router
    })
    server.start();
}

( async () => main() )()