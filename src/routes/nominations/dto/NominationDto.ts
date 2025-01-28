const { body } = require('express-validator');
import { ProjectCategoryValidator } from '../../../common/validation/body';
import { Nomination, User } from '@prisma/client';
import UserDto from '../../users/dto/UserDto';
import { projectCategoryDtoConverter } from './helpers';

export const NominationValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be string'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be string'),
  body('website')
    .notEmpty()
    .withMessage('Webiste is required')
    .isURL()
    .withMessage('Must be valid url'),
  body('description')
    .notEmpty()
    .withMessage('Description must be string')
    .isString()
    .withMessage('Description is required'),
  ...ProjectCategoryValidator,
  body('socialX').optional().isURL().withMessage('Must be valid URL'),
  body('socialInstagram').optional().isURL().withMessage('Must be valid URL'),
  body('socialDiscord').optional().isURL().withMessage('Must be valid URL'),
  body('otherInfo').optional().isString().withMessage('Must be string'),
];

interface FullNominationDto extends Nomination {
  creator?: User;
}

export class NominationDto {
  constructor(nomination: FullNominationDto) {
    this.id = nomination.id;
    this.title = nomination.title;
    this.name = nomination.name;
    this.website = nomination.website;
    this.description = nomination.description;
    this.categories = projectCategoryDtoConverter(nomination.categories);
    this.creator = nomination.creator && new UserDto(nomination.creator);
    this.approvalStage = nomination.approvalStage;
  }

  readonly id;
  readonly title;
  readonly name;
  readonly website;
  readonly description;
  readonly categories;
  readonly creator;
  readonly approvalStage;
}
