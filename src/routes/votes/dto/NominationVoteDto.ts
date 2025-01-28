import { body } from 'express-validator';
import { Vote } from '@prisma/client';

export const NominationVoteValidator = [
  body('voteValue')
    .notEmpty()
    .withMessage('Vote value is required')
    .isIn([Vote.DOWN, Vote.UP])
    .withMessage('Vote value must be: UP or DOWN'),
];
