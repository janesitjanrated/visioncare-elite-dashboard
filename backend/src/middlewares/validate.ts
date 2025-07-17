import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../utils/errors';

const validate = (schema: ZodSchema<any>) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body = schema.parse(request.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = JSON.parse(error.message);
        const messages = errors.map((err: { message: string }) => err.message).join(', ');
        next(new ValidationError(messages));
      } else {
        next(error);
      }
    }
  };
};

export default validate;
