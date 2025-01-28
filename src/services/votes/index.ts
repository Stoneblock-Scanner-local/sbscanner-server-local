import prisma from '../../common/config/prisma';
import { Vote } from '@prisma/client';
import { reduceVoteIds } from './helpers';

const toggleNominationVote = async (
  voterId: string,
  nominationId: string,
  voteValue: Vote,
) => {
  const existingVote = await prisma.nominationVote.findFirst({
    where: {
      nominationId,
      voterId,
    },
  });

  if (existingVote && existingVote.vote === voteValue) {
    return await deleteNominationVote(existingVote.id);
  }

  if (existingVote && existingVote.vote !== voteValue) {
    await deleteNominationVote(existingVote.id);
  }

  return await prisma.nominationVote.create({
    data: {
      vote: voteValue,
      nominationId,
      voterId,
    },
  });
};

const deleteNominationVote = async (voteId: string) => {
  await prisma.nominationVote.delete({
    where: {
      id: voteId,
    },
  });
};

const getNominationVoteCount = async (nominationId: string) => {
  const upVotes = await prisma.nominationVote.count({
    where: { nominationId, vote: Vote.UP },
  });

  const downVotes = await prisma.nominationVote.count({
    where: { nominationId, vote: Vote.DOWN },
  });

  return { upVotes, downVotes };
};

const getNominationBulkCount = async (nominationIds: string[]) => {
  const nominationsUpCount = await groupNominationVotesByCount(
    nominationIds,
    Vote.UP,
  );

  const nominationsDownCount = await groupNominationVotesByCount(
    nominationIds,
    Vote.DOWN,
  );

  return reduceVoteIds(
    nominationIds,
    nominationsUpCount,
    nominationsDownCount,
    'nominationId',
  );
};

const groupNominationVotesByCount = async (
  nominationIds: string[],
  vote: Vote,
) => {
  return await prisma.nominationVote.groupBy({
    by: ['nominationId'],
    where: {
      nominationId: {
        in: nominationIds,
      },
      vote: vote,
    },
    _count: { nominationId: true },
  });
};

export default {
  toggleNominationVote,
  getNominationVoteCount,
  getNominationBulkCount,
};
