import { NextFunction, Request, Response } from 'express';
import { AppError } from '../BaseError';

export const ErrorMiddleware = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (!(error instanceof AppError)) {
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
  return response.status(error.code).json(error.serialize());
};
