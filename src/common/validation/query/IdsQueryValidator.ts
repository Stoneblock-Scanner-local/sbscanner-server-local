import { query } from 'express-validator';

export const IdsQueryValidator = [
  query('ids')
    .custom((value) => {
      if (typeof value !== 'string' || !Array.isArray(value)) {
        return true;
      }
    })
    .withMessage('Must be string or array of strings'),
];
