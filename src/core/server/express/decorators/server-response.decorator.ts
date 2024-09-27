import { Request, Response } from "express"

// export function ServerResponse<T>(){
//     return function ( target:any, propertyKey: string, descriptor: any ){
//         const originalMethod = descriptor.value
        
//         descriptor.value = function(req: Request, res: Response, ...args:any[]) {
//             const result: Promise<T> = originalMethod.apply(this, [req,res, ...args])
//             result.then( (response: T) => res.status(200).json({status:true, response }))
//                   .catch(error =>  this.handleError(error, res) )
//         }
//         return descriptor
//     }
// }

export function ServerResponse<T>() {
    return function (target: any, propertyKey: string, descriptor: any) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function(req: Request, res: Response, ...args: any[]) {
            const self = this;
            const result: Promise<T> = originalMethod.apply(this, [req, res, ...args]);

            // Almacena el contexto de this

            result
                .then((response: T) => res.status(200).json({ status: true, response }))
                .catch(error => self.handleError(error, res)); // Usa el contexto almacenado
        };

        return descriptor;
    }
}
