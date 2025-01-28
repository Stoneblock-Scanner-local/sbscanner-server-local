import { Request, Response, NextFunction } from 'express';

export const attachIpAddress = (
  req: Request<{ ipAddress: string }>,
  res: Response,
  next: NextFunction,
) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  let ipAddress;
  switch (typeof xForwardedFor) {
    case 'string':
      ipAddress = xForwardedFor;
    case 'object':
      ipAddress = xForwardedFor[0];
    default:
      ipAddress = req.ip;
  }

  req.params.ipAddress = ipAddress!;
  next();
};
