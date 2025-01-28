import {
  PaginationQueryValidator,
  PaginationQueryDto,
} from '../../../../common/validation/query/PaginationQueryDto';

export const GetProjectAuditsQueryValidator = [...PaginationQueryValidator];

export interface ProjectAuditsQueryDto extends PaginationQueryDto {}
