import { NotFoundError } from "../../errors/not-found.error";
import { Request, Response, NextFunction } from "express";

const errorNotFound = (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError());
};

export default errorNotFound;
