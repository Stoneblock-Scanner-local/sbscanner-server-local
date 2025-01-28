import { CommentValidator } from './CommentDto';
import { body } from 'express-validator';
import { isValidUUID } from '../../../common/validation/utils';

export const NominationCommentValidator = [
  ...CommentValidator,
  body('repliedToNominationId')
    .notEmpty()
    .withMessage('NominationId is required')
    .isString()
    .withMessage('NominationId must be string')
    .custom(isValidUUID)
    .withMessage('Invalid UUID'),
];
