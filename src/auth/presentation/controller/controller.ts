import { Response } from "express";
import { ServerResponse } from "../../../core/interfaces";
import { CustomError } from "../../../core/models";

export abstract class Controller{

    protected handleError = ( error: unknown, res: Response ) => {

        const serverResponse: ServerResponse<{error: string}> = {
          status: false,
          response: { error: 'Internal server error' }
        }
    
        if ( error instanceof CustomError ) {
          serverResponse.response.error = error.message
          return res.status( error.statusCode ).json( serverResponse );
        }
    
        console.log( `${ error }` );
        return res.status( 500 ).json( serverResponse );
      };
}