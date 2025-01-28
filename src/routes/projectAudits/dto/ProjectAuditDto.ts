import { ProjectCategoryValidator } from '../../../common/validation/body';
const { body } = require('express-validator');

export const ProjectAuditValidator = [
  body('contactName')
    .notEmpty()
    .withMessage('Contact name is required')
    .isString()
    .withMessage('ContactName must be string'),
  body('socialEmail')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be valid email address'),
  body('socialTelegram')
    .optional()
    .isString()
    .withMessage('Telegram must be string'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be string'),
  body('description')
    .notEmpty()
    .withMessage('Description must be string')
    .isString()
    .withMessage('Description is required'),
  body('presentationSrc')
    .notEmpty()
    .withMessage('PresentationSrc must be string')
    .isString()
    .withMessage('PresentationSrc is required'),
  body('founderDescription')
    .notEmpty()
    .withMessage('Founder description must be string')
    .isString()
    .withMessage('Founder description is required'),
  ...ProjectCategoryValidator,
  body('website')
    .notEmpty()
    .withMessage('Can not be empty')
    .isURL()
    .withMessage('Must be valid URL'),
  body('socialX')
    .notEmpty()
    .withMessage('Can not be empty')
    .isURL()
    .withMessage('Must be valid URL'),
  body('socialInstagram')
    .notEmpty()
    .withMessage('Can not be empty')
    .isURL()
    .withMessage('Must be valid URL'),
  body('socialDiscord')
    .notEmpty()
    .withMessage('Can not be empty')
    .isURL()
    .withMessage('Must be valid URL'),
  body('otherInfo').optional().isString().withMessage('Must be string'),
];
