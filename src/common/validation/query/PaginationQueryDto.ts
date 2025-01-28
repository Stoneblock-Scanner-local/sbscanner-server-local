const { query } = require("express-validator");

export const PaginationQueryValidator = [
  query("skip")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Skip must be integer higher or equals 0"),
  query("take")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Take must be positive integer"),
];

export interface PaginationQueryDto {
  skip?: number;
  take?: number;
}
