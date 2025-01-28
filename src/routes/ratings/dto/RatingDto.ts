import { body } from 'express-validator';
import { isValidUUID } from '../../../common/validation/utils';

export const RatingValidator = [
  body('rating')
    .notEmpty()
    .withMessage('Ratings is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Must be number between 1-5'),
  body('ratingId')
    .optional()
    .isString()
    .withMessage('Must be string')
    .custom(isValidUUID)
    .withMessage('Invalid UUID'),
];
