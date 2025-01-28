import { ProjectCategory } from '@prisma/client';
import {
  PaginationQueryValidator,
  PaginationQueryDto,
} from '../../../../common/validation/query/PaginationQueryDto';
import { query } from 'express-validator';
import { SearchTermQueryValidator } from '../../../../common/validation/query/SearchTermQuery';

export const GetProjectsQueryValidator = [
  ...PaginationQueryValidator,
  query('category')
    .optional()
    .isIn([
      ProjectCategory.DEFI,
      ProjectCategory.DEVELOPER_TOOLING,
      ProjectCategory.GAMING,
      ProjectCategory.INFRASTRUCTURE,
      ProjectCategory.NFT,
      ProjectCategory.OTHER,
      ProjectCategory.SOCIAL,
    ])
    .withMessage('Invalid category'),
  ...SearchTermQueryValidator,
];

export interface ProjectsQueryDto extends PaginationQueryDto {
  category?: ProjectCategory;
  searchTerm?: string;
}
