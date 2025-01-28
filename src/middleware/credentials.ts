import { Request, NextFunction } from 'express';
import { allowedOrigins } from '../common/utils/constants';

const credentials = (
  req: Request,
  res: { header: any },
  next: NextFunction,
) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

module.exports = credentials;
