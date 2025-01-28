import { body } from 'express-validator';

export const ResetPasswordValidator = [
  body('newPassword')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must have at least 5 characters'),
  body('confirmedPassword')
    .exists({ checkFalsy: true })
    .withMessage('Confirmed password is required')
    .isLength({ min: 5 })
    .withMessage('Confirmed password must have at least 5 characters'),
];

export interface ResetPasswordDto {
  newPassword: string;
  confirmedPassword: string;
}
