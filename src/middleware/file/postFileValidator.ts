import { NextFunction, Response, Request } from 'express';
import { createCustomError } from '../../errors/custom-error';

export const postFileValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.file) return next(createCustomError('File is not provided', 400));

  next();
};
