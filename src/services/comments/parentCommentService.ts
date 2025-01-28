import prisma from '../../common/config/prisma';
import { UpdateChildrenAction } from './types';

const getUpdateParentCommentPromise = (
  action: UpdateChildrenAction,
  repliedToCommentId?: string,
) => {
  if (!repliedToCommentId) return;

  return prisma.nominationComment.update({
    where: {
      id: repliedToCommentId,
    },
    data: {
      numberOfChildren: {
        [action]: 1,
      },
    },
  });
};

const updateParentForCreate = async (
  repliedToCommentId?: string,
  commentPromise?: any,
) => {
  const updateParentPromise = getUpdateParentCommentPromise(
    UpdateChildrenAction.Increment,
    repliedToCommentId,
  );

  const result = await prisma.$transaction(
    [updateParentPromise, commentPromise].filter((p) => p),
  );

  return result.pop();
};

const updateParentForDelete = async (
  repliedToCommentId?: string,
  commentPromise?: any,
) => {
  const updateParentPromise = getUpdateParentCommentPromise(
    UpdateChildrenAction.Decrement,
    repliedToCommentId,
  );

  const result = await prisma.$transaction(
    [updateParentPromise, commentPromise].filter((p) => p),
  );

  return result.pop();
};

export { updateParentForCreate, updateParentForDelete };
