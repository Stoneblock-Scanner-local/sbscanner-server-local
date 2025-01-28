import { NextFunction, Request, Response } from 'express';
import { createCustomError } from '../../errors/custom-error';
import { Role } from '@prisma/client';

export const verifyRoles = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user && req.session.user.role === role) {
      return next();
    }
    return next(createCustomError("You don't have role access", 403));
  };
};
