import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface AppError extends Error {
  status?: number;
  code?: string;
}

export default function errorHandler(
  error: Error | AppError | ZodError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error('[ERROR]', error);

  if (error instanceof ZodError) {
    return response.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: error.issues,
      },
    });
  }

  const appError = error as AppError;
  response.status(appError.status || 500).json({
    success: false,
    error: {
      code: appError.code || 'INTERNAL_ERROR',
      message: appError.message || 'Internal Server Error',
    },
  });
}
