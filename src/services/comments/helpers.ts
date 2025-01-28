import { FullComment } from '../../routes/comments/dto/CommentDto';

const rootQueryBuilder = (id: string) => {
  return {
    repliedToNominationId: id,
    repliedToCommentId: null,
    OR: [
      {
        deleted: false,
      },
      {
        numberOfChildren: {
          gt: 0,
        },
      },
    ],
  };
};

const flattenReplies = (comments: FullComment[]) => {
  const replies = comments.map((com) => com.Replies);

  return [comments, ...replies].flat();
};

export { flattenReplies, rootQueryBuilder };
