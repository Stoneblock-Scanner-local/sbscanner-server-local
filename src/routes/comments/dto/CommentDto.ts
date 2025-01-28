import { body } from 'express-validator';
import { isValidUUID } from '../../../common/validation/utils';
import { NominationComment } from '@prisma/client';
import UserDto from '../../users/dto/UserDto';

export const CommentValidator = [
  body('text')
    .notEmpty()
    .withMessage('Text is required')
    .isString()
    .withMessage('Text must be string'),
  body('authorId')
    .notEmpty()
    .withMessage('AuthorId is required')
    .isString()
    .withMessage('AuthorId must be string')
    .custom(isValidUUID)
    .withMessage('Invalid UUID'),
  body('repliedToCommentId')
    .optional()
    .isString()
    .withMessage('RepliedToComment must be string')
    .custom(isValidUUID)
    .withMessage('Invalid UUID'),
];

export type FullComment = NominationComment & {
  Replies?: FullComment[];
  author: UserDto;
};

export default class FullCommentDto {
  constructor(comment: FullComment) {
    this.id = comment.id;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
    this.numberOfChildren = comment.numberOfChildren;
    this.deleted = comment.deleted;
    this.author = comment.author;
    this.replies = comment.Replies;
  }

  readonly id;
  readonly text;
  readonly createdAt;
  readonly numberOfChildren;
  readonly deleted;
  readonly author;
  readonly replies;
}
