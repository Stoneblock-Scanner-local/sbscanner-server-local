const { param } = require('express-validator');

export const EmailParamValidator = [
  param('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be valid email address'),
];
