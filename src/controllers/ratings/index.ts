import { Response, Request, NextFunction } from 'express';
import ratingsService from '../../services/ratings';
import { noRecordException } from '../../errors/no-record-exception';
import { createCustomError } from '../../errors/custom-error';

const createRating = async (
  req: Request<{ nominationId: string }, {}, { rating: number; id?: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rating = await ratingsService.createRating(
      req.params.nominationId,
      req.session.user.id,
      req.body.rating,
      req.body.id,
    );

    return res.status(200).json(rating);
  } catch (error) {
    noRecordException(error, next);
  }
};

const getAvarageRating = async (
  req: Request<{ nominationId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const rating = await ratingsService.getAvarageRatings(
    req.params.nominationId,
  );

  return res.status(200).json(rating || 0);
};

export { createRating, getAvarageRating };
