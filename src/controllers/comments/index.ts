import { Response, Request } from 'express';
import { NominationComment } from '@prisma/client';
import commentService from '../../services/comments';
import { NominationCommentsQueryDto } from '../../routes/comments/dto/query/GetNominationCommentsQueryDto';
import {
  DEFAULT_PAGINATION_SKIP,
  DEFAULT_PAGINATION_TAKE,
} from '../../common/utils/constants';
import { NominationIdParamDto } from '../../routes/nominations/dto/params/NominationIdParamValidatorDto';
import UserDto from '../../routes/users/dto/UserDto';
import FullCommentDto from '../../routes/comments/dto/CommentDto';

const createNominationComment = async (
  req: Request<{}, {}, NominationComment>,
  res: Response,
) => {
  const createdComment = await commentService.createNominationComment(req.body);

  return res.status(200).json(new FullCommentDto(createdComment));
};

const getAllNominationComments = async (
  req: Request<NominationIdParamDto, {}, {}, NominationCommentsQueryDto>,
  res: Response,
) => {
  const { skip = DEFAULT_PAGINATION_SKIP, take = DEFAULT_PAGINATION_TAKE } =
    req.query;

  const comments = await commentService.getAllNominationComment(
    req.params.nominationId,
    +skip,
    +take,
  );
  const commentsDto = comments.map((comment) => new FullCommentDto(comment));

  return res.status(200).json(commentsDto);
};

const deleteNominationComment = async (req: Request, res: Response) => {
  const deletedComment = await commentService.deleteById(req.params.id);

  const deletedCommentDto = {
    ...deletedComment,
    author: deletedComment?.author && new UserDto(deletedComment.author),
  };

  return res.status(200).json(deletedCommentDto);
};

const getNominationCommentsCount = async (
  req: Request<NominationIdParamDto>,
  res: Response,
) => {
  const result = await commentService.getCommentsCount(req.params.nominationId);

  return res.status(200).json(result);
};

const getNominationBulkCount = async (
  req: Request<{}, {}, {}, { ids: string[] | string }>,
  res: Response,
) => {
  const { ids } = req.query;

  const _ids = Array.isArray(ids) ? ids : [ids];

  const bulkCount = await commentService.getNominationBulkCount(_ids);

  return res.status(200).json(bulkCount);
};

export {
  createNominationComment,
  getAllNominationComments,
  deleteNominationComment,
  getNominationCommentsCount,
  getNominationBulkCount,
};
