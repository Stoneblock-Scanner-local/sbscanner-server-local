import { query } from 'express-validator';

export const SearchTermQueryValidator = [
  query('searchTerm')
    .optional()
    .isString()
    .withMessage('Search term must be string'),
];
