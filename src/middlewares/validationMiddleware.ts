// src/middleware/validationMiddleware.ts
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (type: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const dtoObj = plainToInstance(type, req.body);
        validate(dtoObj).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const messages = errors.map(error => Object.values(error.constraints!).join(', ')).join(', ');
                res.status(400).send({ message: messages });
            } else {
                next();
            }
        });
    };
};
