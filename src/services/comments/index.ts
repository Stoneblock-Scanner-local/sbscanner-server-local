import { NominationComment } from '@prisma/client';
import prisma from '../../common/config/prisma';
import { rootQueryBuilder, flattenReplies } from './helpers';
import att from 'array-to-tree';
import {
  updateParentForCreate,
  updateParentForDelete,
} from './parentCommentService';
import commentsPrismaMiddleware from './commentsPrismaMiddleware';
import { FullComment } from '../../routes/comments/dto/CommentDto';
import { reduceEntityIds } from '../../common/services/helpers';

prisma.$use(commentsPrismaMiddleware);

const createNominationComment = async (
  nominationComment: NominationComment,
) => {
  const newNominationComment = await prisma.nominationComment.create({
    data: nominationComment,
    include: {
      author: true,
    },
  });

  await updateParentForCreate(nominationComment.repliedToCommentId!);

  return newNominationComment;
};

const getAllNominationComment = async (
  nominatonId: string,
  skip: number,
  take: number,
) => {
  const rootComments = await getRootComments(nominatonId, skip, take);

  const flattenedComments = flattenReplies(rootComments);

  return att(flattenedComments as any, {
    parentProperty: 'repliedToCommentId',
    childrenProperty: 'Replies',
  }) as FullComment[];
};

const deleteById = async (id: string) => {
  const comment = await getCommentById(id);

  if (!comment) return null;

  const deleteCommentPromise = prisma.nominationComment.delete({
    where: { id: comment.id },
  });

  await updateParentForDelete(
    comment.repliedToCommentId!,
    deleteCommentPromise,
  );

  return comment;
};

const getCommentById = async (id: string) => {
  return await prisma.nominationComment.findUnique({
    where: { id },
    include: { author: true },
  });
};

const getCommentsCount = async (nominationId: string) => {
  return await prisma.nominationComment.count({
    where: { repliedToNominationId: nominationId, deleted: false },
  });
};

const getNominationBulkCount = async (nominationIds: string[]) => {
  const nominationCommentsCount =
    await groupNominationCommentsByCount(nominationIds);

  return reduceEntityIds(
    nominationIds,
    nominationCommentsCount,
    'repliedToNominationId',
  );
};

const getRootComments = async (
  nominationId: string,
  skip: number,
  take: number,
) => {
  const rootComments = await prisma.nominationComment.findMany({
    where: rootQueryBuilder(nominationId),
    include: {
      author: true,
      Replies: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take,
  });

  return rootComments.map((comment) => ({
    ...comment,
    text: comment.deleted ? 'This comment has been deleted.' : comment.text,
  }));
};

const groupNominationCommentsByCount = async (nominationIds: string[]) => {
  return await prisma.nominationComment.groupBy({
    by: ['repliedToNominationId'],
    where: {
      repliedToNominationId: {
        in: nominationIds,
      },
      deleted: false,
    },
    _count: {
      repliedToNominationId: true,
    },
  });
};

export default {
  createNominationComment,
  getAllNominationComment,
  deleteById,
  getCommentsCount,
  getNominationBulkCount,
};
