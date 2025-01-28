const { body } = require('express-validator');
import { ProjectCategory } from '@prisma/client';

export const ProjectCategoryValidator = [
  body('categories')
    .isArray({ min: 0 })
    .withMessage('Categories must be array and cannot be empty')
    .isIn(ProjectCategory)
    .withMessage(
      'Must be one of the following categories: DEFI, DEVELOPER_TOOLING, GAMING, INFRASTRACTURE, NFT, SOCIAL, OTHER',
    ),
];