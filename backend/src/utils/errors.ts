export class BaseError extends Error {
  constructor(message: string, public code: string, public status: number = 500) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AppError extends BaseError {
  constructor(message: string, status: number = 500) {
    super(message, 'APP_ERROR', status);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, 'FORBIDDEN', 403);
  }
}

export class ConflictError extends BaseError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
  }
}

export class DatabaseError extends BaseError {
  constructor(message: string) {
    super(message, 'DATABASE_ERROR', 500);
  }
}
