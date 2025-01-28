import { NextFunction, Request, Response } from 'express';
import { createCustomError } from '../../errors/custom-error';

export const verifySession = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session || !req.session.user) {
    return next(createCustomError('UnAuthenticated', 401));
  }
  next();
};
