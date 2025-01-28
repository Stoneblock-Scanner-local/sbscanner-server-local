const { param } = require('express-validator');

export const TokenParamValidator = [
  param('token')
    .notEmpty()
    .withMessage('Token is required')
    .isString()
    .withMessage('Token must be string'),
];
