import { body } from 'express-validator';

export const UpdateProfileValidator = [
  body('imageSrc').optional().isString().withMessage('Must be string'),
  body('email').optional().isString().withMessage('Must be string'),
  body('displayName').optional().isString().withMessage('Must be string'),
  body('fullName').optional().isString().withMessage('Must be string'),
];