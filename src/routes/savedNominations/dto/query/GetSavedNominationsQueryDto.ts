import {
  PaginationQueryDto,
  PaginationQueryValidator,
} from '../../../../common/validation/query/PaginationQueryDto';
import { SearchTermQueryValidator } from '../../../../common/validation/query/SearchTermQuery';

export const GetSavedNominationsQueryValidator = [
  ...PaginationQueryValidator,
  ...SearchTermQueryValidator,
];

export interface SavedNominationsQueryDto extends PaginationQueryDto {
  searchTerm?: string;
}
