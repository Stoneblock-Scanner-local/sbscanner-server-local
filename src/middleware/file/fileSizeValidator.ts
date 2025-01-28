import { NextFunction, Response, Request } from 'express';
import { createCustomError } from '../../errors/custom-error';
import { getSizeInMb } from '../../common/utils/media';

export const fileSizeValidator = (sizeLimit: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const sizeInMb = getSizeInMb(req.file?.size!);
    if (sizeInMb > sizeLimit) {
      return next(
        createCustomError(
          `File size exceeds the limit of ${sizeLimit} MB!`,
          413,
        ),
      );
    }
    next();
  };
};
