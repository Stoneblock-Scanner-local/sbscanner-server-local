import { Response, Request, NextFunction } from 'express';
import votesService from '../../services/votes/index';
import { Vote } from '@prisma/client';
import { noRecordException } from '../../errors/no-record-exception';

const toggleNominationVote = async (
  req: Request<{ nominationId: string }, {}, { voteValue: Vote }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vote = await votesService.toggleNominationVote(
      req.session.user.id,
      req.params.nominationId,
      req.body.voteValue,
    );

    return res.status(200).json(vote);
  } catch (error) {
    noRecordException(error, next);
  }
};

const getNominationVoteCount = async (
  req: Request<{ nominationId: string }>,
  res: Response,
) => {
  const voteCount = await votesService.getNominationVoteCount(
    req.params.nominationId,
  );

  return res.status(200).json(voteCount);
};

const getNominationBulkCount = async (
  req: Request<{}, {}, {}, { ids: string[] | string }>,
  res: Response,
) => {
  const { ids } = req.query;

  const _ids = Array.isArray(ids) ? ids : [ids];

  const bulkCount = await votesService.getNominationBulkCount(_ids);

  return res.status(200).json(bulkCount);
};

export { toggleNominationVote, getNominationVoteCount, getNominationBulkCount };
