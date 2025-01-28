const { body } = require("express-validator");

export const SignInValidator = [
  body("email").isEmail().withMessage("Must be valid email address"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must have at least 5 characters"),
];

export interface SignInDto {
  email: string;
  password: string;
}
