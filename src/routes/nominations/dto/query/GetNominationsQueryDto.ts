import { ProjectCategory } from '@prisma/client';
import {
  PaginationQueryValidator,
  PaginationQueryDto,
} from '../../../../common/validation/query/PaginationQueryDto';
import { query } from 'express-validator';
import { ApprovalStage } from '@prisma/client';
import { SearchTermQueryValidator } from '../../../../common/validation/query/SearchTermQuery';

export const GetNominationsQueryValidator = [
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
  query('stage')
    .optional()
    .isIn([
      ApprovalStage.PENDING,
      ApprovalStage.RATE_APPROVED,
      ApprovalStage.VOTE_APPROVED,
    ])
    .withMessage(
      'Must be one of the following values: PENDING, VOTE_APPROVED, RATE_APPROVED',
    ),
  ...SearchTermQueryValidator,
];

export interface NominationQueryDto extends PaginationQueryDto {
  category?: ProjectCategory;
  stage?: ApprovalStage;
  searchTerm?: string;
}
