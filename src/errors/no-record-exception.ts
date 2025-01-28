import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createCustomError } from './custom-error';
import { NextFunction } from 'express';

export const noRecordException = (e: any, next: NextFunction) => {
  if (e instanceof PrismaClientKnownRequestError) {
    if (e.code === 'P2025' || e.code === 'P2016') {
      return next(
        createCustomError('There is no record that matches your id', 400),
      );
    }
    if (e.code === 'P2003') {
      return next(createCustomError('Wrong id provided', 400));
    }
  }
  next(e);
};
