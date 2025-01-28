import {
  PaginationQueryValidator,
  PaginationQueryDto,
} from '../../../../common/validation/query/PaginationQueryDto';

export const GetNominationCommentsQueryValidator = [
  ...PaginationQueryValidator,
];

export interface NominationCommentsQueryDto extends PaginationQueryDto {}
