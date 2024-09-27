import { Request, Response, NextFunction  } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'
import { ServerResponse } from '../../../interfaces';


export const validateFields = ( req: Request, res: Response, next: NextFunction ): void => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        res.status(400).json({
            status: false,
            response: errors
        } as ServerResponse<Result<ValidationError>> )
        return
    }
    next()
}