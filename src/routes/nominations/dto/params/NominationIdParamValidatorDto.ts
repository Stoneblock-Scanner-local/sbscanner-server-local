import { CustomParamValidator } from '../../../../common/validation/params';
import { isValidUUID } from '../../../../common/validation/utils';

export const NominationIdParamValidator = CustomParamValidator(
  'nominationId',
  isValidUUID,
  'Invalid UUID',
);

export interface NominationIdParamDto {
  nominationId: string;
}
