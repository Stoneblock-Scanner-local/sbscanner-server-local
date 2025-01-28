const { body } = require('express-validator');

export const SignUpValidator = [
  body('email').isEmail().withMessage('Must be valid email address'),
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be string'),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must have at least 5 characters'),
  body('repeatPassword')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must have at least 5 characters'),
  body('acceptedTermsAndConditions')
    .isBoolean()
    .toBoolean()
    .withMessage('Must be boolean value'),
];

export interface SignUpDto {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  acceptedTermsAndConditions: boolean;
}
