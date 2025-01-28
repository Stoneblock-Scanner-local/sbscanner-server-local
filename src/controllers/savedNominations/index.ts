import { NextFunction, Request, Response } from 'express';
import savedNominationsService from '../../services/savedNominations/index';
import { SavedNominationsQueryDto } from '../../routes/savedNominations/dto/query/GetSavedNominationsQueryDto';
import {
  DEFAULT_PAGINATION_SKIP,
  DEFAULT_PAGINATION_TAKE,
} from '../../common/utils/constants';
import { noRecordException } from '../../errors/no-record-exception';

const toggleNomination = async (
  req: Request<{ nominationId: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await savedNominationsService.toggleSaveNomination(
      req.session.user.id,
      req.params.nominationId,
    );

    return res.status(201).json({ message: `Nomination updated` });
  } catch (e) {
    noRecordException(e, next);
  }
};

const getSavedNominations = async (
  req: Request<{}, {}, {}, SavedNominationsQueryDto>,
  res: Response,
) => {
  const {
    skip = DEFAULT_PAGINATION_SKIP,
    take = DEFAULT_PAGINATION_TAKE,
    searchTerm,
  } = req.query;

  const result = await savedNominationsService.getAllSavedNominationsByUser(
    req.session.user.id,
    +skip,
    +take,
    searchTerm,
  );

  return res.status(200).json(result?.SavedNominations);
};

export { toggleNomination, getSavedNominations };
