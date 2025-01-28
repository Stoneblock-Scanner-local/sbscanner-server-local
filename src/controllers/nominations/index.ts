import { Response, Request, NextFunction } from 'express';
import { Nomination } from '@prisma/client';
import { NominationQueryDto } from '../../routes/nominations/dto/query/GetNominationsQueryDto';
import nominationsService from '../../services/nominations';
import { createCustomError } from '../../errors/custom-error';
import {
  DEFAULT_PAGINATION_SKIP,
  DEFAULT_PAGINATION_TAKE,
} from '../../common/utils/constants';
import { NominationDto } from '../../routes/nominations/dto/NominationDto';
import { noRecordException } from '../../errors/no-record-exception';

const createNomination = async (
  req: Request<{}, {}, Nomination>,
  res: Response,
) => {
  const nomination = await nominationsService.create({
    ...req.body,
    creatorId: req.session.user.id,
  });

  return res.status(200).json(nomination);
};

const getNominations = async (
  req: Request<{}, {}, {}, NominationQueryDto>,
  res: Response,
) => {
  const {
    skip = DEFAULT_PAGINATION_SKIP,
    take = DEFAULT_PAGINATION_TAKE,
    category,
    stage,
    searchTerm,
  } = req.query;

  const nominations = await nominationsService.getAll(
    +skip,
    +take,
    category,
    stage,
    searchTerm,
  );

  const nominationsDto = nominations.map(
    (nomination) => new NominationDto(nomination),
  );

  return res.status(200).json(nominationsDto);
};

const getNomination = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const nomination = await nominationsService.getById(req.params.id);

  if (!nomination) return next(createCustomError('Nomination not found', 400));

  return res.status(200).json(new NominationDto(nomination!));
};
const deleteNomination = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nomination = await nominationsService.deleteById(req.params.id);

    return res
      .status(200)
      .json({ message: `Nomination with id: ${nomination?.id} deleted` });
  } catch (e: any) {
    noRecordException(e, next);
  }
};

const updateNomination = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedNomination = await nominationsService.update(
      req.params.id,
      req.body,
    );

    return res.status(200).json(updatedNomination);
  } catch (error: any) {
    noRecordException(error, next);
  }
};

export {
  createNomination,
  getNominations,
  deleteNomination,
  getNomination,
  updateNomination,
};
