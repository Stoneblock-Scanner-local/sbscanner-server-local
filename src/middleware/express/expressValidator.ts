const { validationResult } = require('express-validator');
import { Request, Response, NextFunction } from 'express';

export const expressValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  next();
};
